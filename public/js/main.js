const form = document.getElementById("vote-form");

form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=os]:checked").value;
  console.log(choice);
  const data = { os: choice };
  fetch("http://127.0.0.1:8000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  e.preventDefault();
});

let dataPoints = [
  {
    label: "Windows",
    y: 0,
  },
  {
    label: "MacOs",
    y: 0,
  },
  {
    label: "Linux",
    y: 0,
  },
  {
    label: "Other",
    y: 0,
  },
];

const chartContainer = document.querySelector("#chartContainer");
if (chartContainer) {
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "theme1",
    title: {
      text: "Os Result",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();
}
