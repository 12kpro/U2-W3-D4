const URLParams = new URLSearchParams(window.location.search)

document.addEventListener('DOMContentLoaded', async () =>{

 const searchUrl = `${BASE_URL}photos/${URLParams.get("id")}`
 const photo = await resp(searchUrl, FETCH_PARAM)
 const {alt, avg_color, photographer, photographer_url, src} = photo
 const bgColor = avg_color
 const main = document.querySelector('main')
 
 main.style.backgroundColor = bgColor

 console.log(photo);
const cnt = document.createElement('div')
const row = cnt.cloneNode()
const col = row.cloneNode()
const details = row.cloneNode()
const btns = row.cloneNode()
const artist = document.createElement('h1')
const artistHome = document.createElement('a')
artistHome.classList.add('btn')
const siteIndex = artistHome.cloneNode()
const img = document.createElement('img')

img.src = src.medium
img.alt = alt 
img.classList.add('img-fluid','w-100')

artist.classList.add('text-capitalize','mb-4')
artist.innerText = photographer
artistHome.classList.add('btn-success')
artistHome.href = photographer_url
artistHome.innerText = 'Visit artist homepage'

siteIndex.classList.add('btn-primary')
siteIndex.href = './index.html'
siteIndex.innerText = 'home'

details.classList.add('p-5', 'd-flex','flex-column')
btns.classList.add('d-flex','justify-content-between')
cnt.classList.add('container')
row.classList.add('row')
col.classList.add('col-6','offset-3')

btns.append(artistHome,siteIndex)
details.append(artist, btns)
col.append(img, details)
row.append(col)
cnt.append(row)
main.append(cnt)
})