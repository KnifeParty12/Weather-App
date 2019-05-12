window.addEventListener('load',()=>{
      let long;
      let lat;
      if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.darksky.net/forecast/cc0a8b6dc6d71f4f248fd250d9cde9b0/${lat},${long}`;
            });

        fetch(api)
            .then(response=>{
                return response.json()
            })
            .then(data =>{
                console.log(data);
            })
      }
      else{
          h1.textContent = "You gotta Enable Location permission boi! "
      }
};
