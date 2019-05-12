window.addEventListener('load',()=>{
      let long;
      let lat;
      let temperatureDegree = document.querySelector(".temperature-degree");
      let temperatureDescription = document.querySelector(".temperature-description");
      let locationTimezone = document.querySelector(".location-timezone");
      let temperatureSection = document.querySelector(".temperature");
      const temperatureSpan = document.querySelector(".temperature span");

      if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/cc0a8b6dc6d71f4f248fd250d9cde9b0/${lat},${long}`;

                fetch(api)
                    .then(response=>{
                        return response.json()
                    })
                    .then(data =>{
                        console.log(data);
                        const {temperature, summary, icon } = data.currently;
                        //Set DOM elements from API
                        temperatureDegree.textContent = temperature;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        //Formula For Celsius
                        let celsius = (temperature - 32)*(5/9);
                        //Set Icons
                        setIcons(icon,document.querySelector(".icon"));

                        //Change temperature to Farenheit
                        temperatureSection.addEventListener('click',()=>{
                            if(temperatureSpan.textContent==="F"){
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(celsius);
                            }else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temperature;
                            }
                        });


                    });
            });
      }
      
      function setIcons(icon, iconID) {
          const skycons = new Skycons({color:"white"});
          const currentIcon = icon.replace(/-/g, "_").toUpperCase();
          skycons.play();
          return skycons.set(iconID,Skycons[currentIcon]);
      }

});
