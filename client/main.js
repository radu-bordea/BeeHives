async function fetchData() {
  const url = "http://localhost:5000/api/temp";
  const response = await fetch(url);
  const datapoints = await response.json();
  return datapoints;
}

fetchData().then((datapoints) => {
  const temps = [];
  const weights = [];

  const values = datapoints.map(function (index) {
    if(index.deviceID == 1){
      return temps.push(index.value);
    }
    if(index.deviceID == 2){
      return weights.push(index.value);
    }
  });
  
  const dates = datapoints.map(function (index) {
    return index.timestamp.slice(0, 10);
  });
  const uniqueDates = [... new Set(dates)]
  
  console.log(temps);
  console.log(weights);
  console.log(uniqueDates);
  console.log(dates);

  let myChart = document.getElementById("myChart");
  let openTemp = false;
  let newTemps = [];
  let openWeight = false;
  let newWeights = [];

  
  const checkboxTemp = document.getElementById("checkboxTemp");
  checkboxTemp.addEventListener("click", () => {
    openTemp = !openTemp;
    if (openTemp) {
      newTemps = temps;
    } else {
      newTemps = []
    }
    showChart(newTemps, newWeights)
  });
  const checkboxWeight = document.getElementById("checkboxWeight");
  checkboxWeight.addEventListener("click", () => {
    openWeight = !openWeight;
    if (openWeight) {
      newWeights = weights;
    } else {
      newWeights = []
    }
    showChart(newTemps, newWeights)
  });


  function showChart(temps, weights){
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
        ],
      },
      options: {
        legend: { display: false },
      },
    });
  }
 
  const box = document.getElementById("box");
  const graph = document.getElementById("graph");

  graph.addEventListener("click", () => {
    box.style.visibility = "visible";
  });
});
