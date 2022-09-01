const loadMore = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
     displayPhone(data.data, dataLimit)
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText = '';
    // display only 10 phones
    const showMore = document.getElementById('show-more')
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      showMore.classList.remove('d-none')
    }
    else{
      showMore.classList.add('d-none')
    }
    // error message
    const noPhone = document.getElementById('error-message');
    if(phones.length === 0){
       noPhone.classList.remove('d-none');
      
    }
    else{
       noPhone.classList.add('d-none');
      
    }

    // display all phones
    phones.forEach(phone => {
      
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"> Details </button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpiner(false)
}
const searchProcess = (dataLimit) => {
   // start loader
  toggleSpiner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadMore(searchText, dataLimit);
  // searchField.value = '';
}
const searchPhone = () => {
 
  searchProcess(10);
 
}



// spinner loading
const toggleSpiner = isLoading => {
 const spinnerSection = document.getElementById('loader');
 if(isLoading){
  spinnerSection.classList.remove('d-none')
 }
 else{
  spinnerSection.classList.add('d-none')
 }
}
// show all button
  document.getElementById('btn-show-more').addEventListener('click', function(){
      
      searchProcess();
  })
document.getElementById("search-field").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchProcess(10);
  }
});

const phoneDetails = async (id) =>{
  try{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}` 
    const res = await  fetch (url)
    const data = await res.json()
    showDisplayDetails(data.data)
  }
  catch(error){
    console.log(error);
  }
}
const showDisplayDetails = (phone) => {
 
  const showModal = document.getElementById('modalLabel')
  showModal.innerText = `${phone.slug}`;
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerHTML = `
  <h3>${phone.brand}</h3>
  <p>${phone.releaseDate ? phone.releaseDate : 'null'} </p>
  <p>${phone.mainFeatures ? phone.mainFeatures.memory : 'null'}</p>
  `
}
  // loadMore();