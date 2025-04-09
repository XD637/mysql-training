fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(json => console.log(json))