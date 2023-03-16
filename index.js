
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
    btnView.dataset.toggle = "modal";
    btnView.dataset.target = `#modal-${id}`;
    btnHide.innerText = 'Hide'
    
    tpl.querySelector('.card-text').innerText = alt
    tpl.querySelector('.card-title').innerText = photographer
    tpl.querySelector('.text-muted').innerText = id


    tpl.querySelector('.card').prepend(img)
    tpl.querySelector('.btn-group').append(btnView, btnHide)

/*    btnView.addEventListener('click',(e)=>{
      
  })*/
    btnHide.addEventListener('click',(e)=>{
        e.target.closest(".card").remove()
    })
    img.addEventListener('click',(e)=>{
      location.assign(`./details.html?id=${id}`)
    })

    return tpl
}
const renderModal = (photo) => {
  const {alt, avg_color, height, id, liked, photographer, photographer_id, photographer_url, src, url, width} = photo
  const tpl = document.getElementById('modal').content.cloneNode(true) 
  tpl.firstElementChild.setAttribute('id',`modal-${id}`)

  const img = document.createElement('img')
  img.src = src.medium
  img.alt = alt 
  img.classList.add('img-fluid')

  tpl.querySelector('.modal-body').append(img)
  tpl.querySelector('.modal-title').innerText = alt
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
        cnt.append(renderCard(photo))
        cnt.append(renderModal(photo))
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
