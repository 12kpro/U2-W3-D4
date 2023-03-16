const URLParams = new URLSearchParams(window.location.search)
//const selectedId = URLParams.get("id")

document.addEventListener('DOMContentLoaded', async () =>{

 const searchUrl = `${BASE_URL}photos/${URLParams.get("id")}`
 const photo = await resp(searchUrl, FETCH_PARAM)
 const {alt, avg_color, height, id, liked, photographer, photographer_id, photographer_url, src, url, width} = photo

 const cnt = document.querySelector('main .container')
 console.log(cnt);
 cnt.style.backgroundColor =`#${avg_color}`

 console.log(photo);

  const img = document.createElement('img')

    img.src = src.medium
    img.alt = alt 
    img.classList.add('img-fluid')
    img.height = 225

    cnt.append(img)
})