// fetch('https://official-joke-api.appspot.com/random_joke')
//       .then(response => response.json())
//       .then(json => console.log(json))

import fetch from 'node-fetch'

async function fetchFromApi(api){
      try{
      const res = await fetch(api);
      const data = await res.json();
      console.log(data);
      } catch(e){
            console.log(e);
      }
}

fetchFromApi('https://official-joke-api.appspot.com/random_joke');

