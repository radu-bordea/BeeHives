
async function fetchDataMeasurements() {
  const urlMeasurements = "http://localhost:5000/api/measurements";
  const response = await fetch(urlMeasurements);
  const datapoints = await response.json();
  console.log(datapoints);
  return datapoints;
}

fetchDataMeasurements().then((datapoints) => {
  const devices = datapoints.map(item => item.deviceID)
  const types = datapoints.map(item => item.typeID)
  const typeNames = datapoints.map(item => item.typeName)
  const typeNamesUnique = [... new Set(typeNames)]
  console.log(typeNamesUnique);

  colors=["red", "green", "blue", "yellow", "orange"]
  const devtyp = []
  for(let i = 0; i< devices.length; i++){
/*      devtyp.push(`Device: ${devices[i]} typeID: ${types[i]} typeName: ${typeNames[i]}`) */
        devtyp.push(`Device ID: ${devices[i]}, ${typeNames[i]}`) 
  }
 
  const devtypUnique = [... new Set(devtyp)]
  console.log(devtypUnique);

  const listDevices = document.getElementById("list-of-devices"); 

  for(const i of devtypUnique){
    const h6 = document.createElement("h6");
    h6.classList.add("h6style");
    const h6Content = document.createTextNode(i);
    h6.appendChild(h6Content);
    listDevices.appendChild(h6)
  }

  const searchDevice = document.getElementById("searchDevice");
  const btnSearchDevice = document.getElementById("btnSearchDevice");

  btnSearchDevice.addEventListener('click', () => {
    color = ""
    colorPalette = document.getElementById("colorPalette");
    colorPalette.innerHTML = "";
    deviceIdValues=[]
      const deviceSearched = datapoints.map((item) => {
        if(item.deviceID === Number(searchDevice.value)){
          deviceIdValues.push(item.value)
          console.log(item.value)
          color = colors[item.typeID-1];
          console.log(color)
        }
      });
      showChart(deviceIdValues)

      
      let r = 0;
      for(const item of typeNamesUnique){
        const cc = document.createElement("span");
        cc.style.marginRight = "5px";
        cc.style.color = colors[r++];
        cc.style.fontWeight = "bold";
        const ccContent = document.createTextNode(item);
        cc.appendChild(ccContent);
        colorPalette.appendChild(cc);
        console.log(item);
      }
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
            borderColor: color,
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
