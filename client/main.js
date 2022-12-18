async function fetchData() {
  const url = "http://localhost:5000/api/temp";
  const response = await fetch(url);
  const datapoints = await response.json();
  return datapoints;
}

fetchData().then((datapoints) => {
  const temps = [];
  const weights = [];
  const humidity = [];

  const values = datapoints.map(function (index) {
    if(index.deviceID === 1){
      return temps.push(index.value);
    }
    if(index.deviceID === 2){
      return weights.push(index.value);
    }
    if(index.deviceID === 3){
      return humidity.push(index.value);
    }
  });
  
  const dates = datapoints.map(function (index) {
    return index.timestamp.slice(0, 10);
  });
  const uniqueDates = [... new Set(dates)]
  
  console.log(temps);
  console.log(weights);
  console.log(humidity);
  console.log(uniqueDates);
  console.log(dates);

  let myChart = document.getElementById("myChart");
  let openTemp = false;
  let newTemps = [];
  let openWeight = false;
  let newWeights = [];
  let openHumidity = false;
  let newHumidity = [];

  
  const checkboxTemp = document.getElementById("checkboxTemp");
  checkboxTemp.addEventListener("click", () => {
    openTemp = !openTemp;
    if (openTemp) {
      newTemps = temps;
    } else {
      newTemps = []
    }
    showChart(newTemps, newWeights, humidity)
  });

  const checkboxWeight = document.getElementById("checkboxWeight");
  checkboxWeight.addEventListener("click", () => {
    openWeight = !openWeight;
    if (openWeight) {
      newWeights = weights;
    } else {
      newWeights = []
    }
    showChart(newTemps, newWeights, humidity)
  });

  const checkboxHumidity = document.getElementById("checkboxHumidity");
  checkboxHumidity.addEventListener("click", () => {
    openHumidity = !openHumidity;
    if (openHumidity) {
      newHumidity = humidity;
    } else {
      newHumidity = []
    }
    showChart(newTemps, newWeights, newHumidity)
  })


  function showChart(temps, weights, humidity){
    new Chart("myChart", {
      type: "line",
      data: {
        labels: uniqueDates,
        datasets: [
          {
            data: temps,
            borderColor: "red",
            fill: false,
          },
          {
            data: weights,
            borderColor: "green",
            fill: false,
          },
          {
            data: humidity,
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: true},
      },
    });
  }
 
  const box = document.getElementById("box");
  const graph = document.getElementById("graph");

  graph.addEventListener("click", () => {
    box.style.visibility = "visible";
  });
});
