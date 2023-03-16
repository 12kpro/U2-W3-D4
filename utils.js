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