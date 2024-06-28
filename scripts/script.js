const loadPhone= async(inputFieldValue,isShowAll)=>{
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones,isShowAll) => {
    
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const NoDataValidation = document.getElementById('NoDataValidation');
    
    if (phones.length == 0) {
        NoDataValidation.innerHTML =
            `<div class="text-center">
            <h3 class=" text-4xl text-red-600 font-extrabold text-danger py-5">No Phone Found</h3>
            </div>
            `;
    }else{
        NoDataValidation.textContent ='';
    }
    
    // console.log(phones);
    // hiding showAllBtn 
    const showAllBtn = document.getElementById('showAllBtn');
    if(phones.length > 8 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden')
    }
    console.log('isShowAll',isShowAll)
    // for showing phone with limit 
    // phones = phones.slice(0,8)
    
    if(!isShowAll){
        phones = phones.slice(0,8)
    }
    
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100  bg-[#FFFFFF]  border-2 border-black`;
        phoneCard.innerHTML =  `
        <figure class="px-5 pt-5">
            <img src="${phone.image}" alt="Shoes" class="bg-[#87a9dc] px-[75px] py-[30px] rounded-lg" />
        </figure>
        <div class="card-body items-center text-center p-10">
            <h2 class="card-title text-2xl font-bold text-[#403F3F]">${phone.phone_name}</h2>
            <p class="text-[#706F6F] text-lg font-normal leading-7 text-center">There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
                <button onClick ="handleShowDetails('${phone.slug}')" class="btn  btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white text-xl font-semibold ">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        
    })
    loadingHandle(false);
}



// handling showDetails
const handleShowDetails = async (id)=> {
    console.log(id);
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =await res.json();
    console.log(data.data)
    modalHandle(data.data);
    
}

// modal 
const modalHandle = (phone)=>{
    const modalDetails = document.getElementById('detailsModal');
    const div = document.createElement('div');
    
    div.classList =('flex flex-col ')
    div.innerHTML = `
    <div class="bg-[#87a9dc] rounded-lg py-4">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl h-3/6 w-3/6 mx-auto bg-[#87a9dc] " />
    </div>
    <h3 class="card-title text-2xl font-bold text-[#403F3F] p-1">${phone.name}</h3>
    <p class="text-black text-xl font-normal leading-7 text-left p-1"><span class="text-[#403F3F] font-bold leading-7 text-xl">Storage:</span>${phone.mainFeatures?.storage}</p>
    <p class="text-black text-xl font-normal leading-7 text-left p-1"><span class="text-[#403F3F] font-bold leading-7 text-xl">Chipset:</span>${phone.mainFeatures?.chipSet}</p>
    <p class="text-black text-xl font-normal leading-7 text-left p-1"><span class="text-[#403F3F] font-bold leading-7 text-xl">Brand:</span>${phone.brand} </p>
    <p class="text-black text-xl font-normal leading-7 text-left p-1"><span class="text-[#403F3F] font-bold leading-7 text-xl">Release data:</span>${phone.releaseDate} </p>
    `;
    modalDetails.appendChild(div);
    
    my_modal_5.showModal();
    clearModal(div);
    
}
// const clearModal = (div) =>{
//     div.innerHTML = '';
// }



const handleSearch = (isShowAll)=> {
    const inputField = document.getElementById('inputField');
    const inputFieldValue = inputField.value;
    loadPhone(inputFieldValue,isShowAll);
    // inputField.value = ''; [[[LOOK AT THIS]]]
    loadingHandle(true);
    
}

const loadingHandle = (isLoading) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAllBtn = ()=>{
    
    handleSearch(true);
}