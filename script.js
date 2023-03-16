const API_KEY = 'paJxadIDTvKeyIqYVb20lbwxDj6p14qf9vV4BHuGw9oTkgIW5XG5Rz0M'
const BASE_URL = 'https://api.pexels.com/v1/'
const FETCH_PARAM = {
    headers: {
      //"Content-Type": "application/json; charset=utf-8",
      "Authorization": "paJxadIDTvKeyIqYVb20lbwxDj6p14qf9vV4BHuGw9oTkgIW5XG5Rz0M"
    }
  }
const SEARCH_PARAM = {
  query:'nature',
  size: 'small',
  per_page:9
}
//"https://api.pexels.com/v1/search?query=nature&per_page=1"
//"https://api.pexels.com/v1/photos/2014422"
//"https://api.pexels.com/v1/search?query=people"
//"https://api.pexels.com/v1/collections/featured?per_page=1

//height="225"

const resp = async (url, params) => {
    try {
        const response = await fetch(url, params)
        const data = await response.json()

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }        
        return  data       
    } catch (error) {
        console.log(error);
    }
}
/*
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
          </div>
          <small class="text-muted"></small>
        </div>
      </div>
    </div>
  </div>
*/



const renderCard = (photo) => {
    const {alt, avg_color, height, id, liked, photographer, photographer_id, photographer_url, src, url, width} = photo
    const tpl = document.querySelector('#card').content.cloneNode(true) 
    const img = document.createElement('img')
    const btnView = document.createElement('button')
    btnView.classList.add('btn', 'btn-sm', 'btn-outline-secondary')
    const btnHide = btnView.cloneNode()

    //card-img-top" width="100%" height="225"
    img.src = src.medium
    img.alt = alt 
    img.classList.add('card-img-top')
    img.height = 225

    btnView.innerText = 'View'
    btnHide.innerText = 'Hide'
    
    tpl.querySelector('.card-text').innerText = alt
    tpl.querySelector('.card-title').innerText = photographer
    tpl.querySelector('.text-muted').innerText = id


    tpl.querySelector('.card').prepend(img)
    tpl.querySelector('.btn-group').append(btnView, btnHide)

    btnHide.addEventListener('click',(e)=>{
        e.target.closest(".card").remove()
    })

    return tpl
}


const loadImages = async (param) => {
    const cnt = document.querySelector('.album .row')
    cnt.innerHTML = ''

    const loader = document.getElementById('loader')
    loader.classList.remove('d-none')
    loader.classList.add('d-flex')

    const url = `${BASE_URL}search?${new URLSearchParams(param)}`
    const data = await resp(url, FETCH_PARAM)

    for (const photo of data.photos) {
        cnt.append(renderCard(photo) )
    }
    loader.classList.remove('d-flex')
    loader.classList.add('d-none')
}

document.addEventListener('DOMContentLoaded', () =>{
  let typingTimer = null
  document.getElementById('primaryLoad').addEventListener('click',(e) =>{
      loadImages(SEARCH_PARAM)
  })
  document.getElementById('secondaryLoad').addEventListener('click',(e) =>{
      SEARCH_PARAM.query = 'Tigers'
      loadImages(SEARCH_PARAM)
})
document.getElementById('search').addEventListener('keyup',(e) =>{
  clearTimeout(typingTimer)
  typingTimer = setTimeout(()=>{
    SEARCH_PARAM.query = e.target.value
    loadImages(SEARCH_PARAM)  
  }, 1000);

})




    //console.log(data);
})
