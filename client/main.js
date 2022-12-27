async function fetchDataMeasurements() {
  const urlMeasurements = "http://localhost:5000/api/measurements";
  const response = await fetch(urlMeasurements);
  const datapoints = await response.json();
  return datapoints;
}

async function fetchDataTypes() {
  const urlTypes = "http://localhost:5000/api/types";
  const response = await fetch(urlTypes);
  const datapoints = await response.json();
  console.log(datapoints);
  // console.log(datapoints[0].typeName);
  return datapoints;
}
fetchDataTypes()

async function fetchDataDevices() {
  const urlDevices = "http://localhost:5000/api/devices";
  const response = await fetch(urlDevices);
  const datapoints = await response.json();
  console.log(datapoints);
  // console.log(datapoints[0]);
  return datapoints;
}
fetchDataDevices()


fetchDataMeasurements().then((datapoints) => {

  let deviceIdValues = []

  const devices = datapoints.map(item => item.deviceID)
  const devicesUnique = [... new Set(devices)];
  
  const listDevices = document.getElementById("list-of-devices"); 
  console.log(listDevices);

  for(const i of devicesUnique){
    console.log(datapoints)
    const h6 = document.createElement("h6");
    h6.classList.add("h6style");
    const h6Content = document.createTextNode("Device ID: " + i);
    h6.appendChild(h6Content);
    listDevices.appendChild(h6)
  }

  const searchDevice = document.getElementById("searchDevice");
  const btnSearchDevice = document.getElementById("btnSearchDevice");

  btnSearchDevice.addEventListener('click', () => {
    deviceIdValues=[]
      const deviceSearched = datapoints.map((item) => {
        if(item.deviceID === Number(searchDevice.value)){
          deviceIdValues.push(item.value)
          console.log(item.value)
        }
      });
      showChart(deviceIdValues)
  })

  const dates = datapoints.map(function (index) {
    return index.timestamp.slice(0, 10);
  });
  const uniqueDates = [... new Set(dates)]
  
  // console.log(uniqueDates);
  // console.log(dates);

  let myChart = document.getElementById("myChart");
  let openTemp = false;
  let newTemps = [];
  let openWeight = false;
  let newWeights = [];
  let openHumidity = false;
  let newHumidity = [];

  function showChart(deviceIdValues){
    new Chart("myChart", {
      type: "line",
      data: {
        labels: uniqueDates,
        datasets: [
          {
            data: deviceIdValues,
            borderColor: "red",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false},
      },
    });
  }
 
  const box = document.getElementById("box");
  const graph = document.getElementById("graph");

  graph.addEventListener("click", () => {
    box.style.visibility = "visible";
  });
});
