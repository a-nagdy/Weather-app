let URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let key = "71d58dc09c65a35757102daa699ff087&units=metric";

const newDate = new Date().toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

//async get

const TemperatureData = async (URL, zip, key) => {
  const response = await fetch(URL + zip + "&appid=" + key);
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};
const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await postRequest.json();
    // console.log(newData);
    // console.log(newData.temperature);
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

// button to dynamically update the client data and display it in the app

document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  let zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  TemperatureData(URL, zip, key).then((data) => {
    postData("http://localhost:8080/addWeatherData", {
      temperature: data.main.temp,
      date: newDate,
      user_response: feelings,
    })
      .then(() => {
        const date = document.getElementById("date");
        date.innerHTML = newDate;

        const temperature = document.getElementById("temp");
        temperature.innerHTML = data.main.temp;

        const content = document.getElementById("content");
        content.innerHTML = feelings;
      })
      .then(() => {
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
      });
  });
});
