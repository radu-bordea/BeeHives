
async function fetchData() {
  const url = "http://localhost:5000/api/temp";
  const response = await fetch(url);
  const datapoints = await response.json();
  return datapoints;
}

  fetchData().then((datapoints) => {
    const temps = datapoints.map(function (index) {
      return index.value;
    });
    const dates = datapoints.map(function (index) {
      return index.timestamp.slice(0, 10);
    });
    console.log(temps);
    console.log(dates);

    let myChart = document.getElementById("myChart");

    const checkboxTemp = document.getElementById("checkboxTemp");
    let open = false;
    checkboxTemp.addEventListener("click", () => {
      let newDates;
      let newTemps;
      open = !open;
      if (open) {
        newDates = dates;
        newTemps = temps;
      }else{
        newDates = []
        newTemps = []
      }

                    new Chart(myChart, {
                      type: "line",
                      data: {
                        labels: newDates,
                        datasets: [
                          {
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(0,0,255,1.0)",
                            borderColor: "rgba(0,0,255,0.1)",
                            data: newTemps,
                          },
                        ],
                      },
                      options: {
                        legend: { display: false },
                        scales: {
                          yAxes: [{ ticks: { min: 0, max: 30 } }],
                        },
                      },
                    });

    });

    const box = document.getElementById("box");
    const graph = document.getElementById("graph");

    graph.addEventListener("click", () => {
      box.style.visibility = "visible";
    });
  });