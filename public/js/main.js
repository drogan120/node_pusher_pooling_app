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

fetch("http://127.0.0.1:8000/poll")
  .then((res) => res.json())
  .then((data) => {
    const votes = data.votes;
    const totalVotes = votes.length;

    // count vote point
    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );

    let dataPoints = [
      {
        label: "Windows",
        y: voteCounts.Windows,
      },
      {
        label: "MacOS",
        y: voteCounts.MacOS,
      },
      {
        label: "Linux",
        y: voteCounts.Linux,
      },
      {
        label: "Other",
        y: voteCounts.Other,
      },
    ];

    const chartContainer = document.querySelector("#chartContainer");
    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          text: `Total vote ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();
      Pusher.logToConsole = true;
      let pusher = new Pusher("329e4eef68ec43e0a724", {
        cluster: "ap1",
      });

      let channel = pusher.subscribe("os-poll");
      channel.bind("os-vote", function (data) {
        dataPoints = dataPoints.map((x) => {
          if (x.label == data.os) {
            x.y += data.point;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }
  });
