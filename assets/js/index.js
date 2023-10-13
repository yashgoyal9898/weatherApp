document.addEventListener("DOMContentLoaded", () => {
  let state;
  document.getElementById('search-country').addEventListener('click', () => {
    state = document.getElementById('search-value').value;
    const url = `https://foreca-weather.p.rapidapi.com/location/search/${state}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aa19fac405mshe7b1f8e4ac38edep136e9cjsnf483ca3e74a3",
      "X-RapidAPI-Host": "foreca-weather.p.rapidapi.com",
    },
  };
  



// First API request to get the country ID
fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((result) => {
    console.log(result)
    const countryID = result.locations[0].id; // Get the country ID from the first API response
    document.getElementById('country-name').innerHTML = result.locations[0].name
    return fetch(`https://foreca-weather.p.rapidapi.com/observation/latest/${countryID}`, options);
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((result) => {
    document.getElementById('temperature').innerHTML = result.observations[0].temperature;
    document.getElementById('humidity').textContent = `Humidity: ${result.observations[0].relHumidity}`;
    document.getElementById('windspeed').textContent = `Windspeed: ${result.observations[0].windSpeed}`;
    console.log(result.observations[0].temperature);
  })
  .catch((error) => {
    console.error(error);
  });
});

});


