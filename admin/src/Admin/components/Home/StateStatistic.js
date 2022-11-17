import { useEffect, useState } from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJs.register(Tooltip, Title, ArcElement, Legend);
function StateStatistic() {
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60],
      },
    ],
    labels: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
  });
  useEffect(() => {
    const fetchData = () => {
      fetch("http://172.16.226.57:8080/api/stateStatistic")
        .then((data) => {
          const res = data.json();

          return res;
        })
        .then((res) => {
          console.log("resss", res);
          const label = [];
          const data = [];
          for (var i of res) {
            label.push(i.name);
            data.push(i.value);
          }
          setData({
            datasets: [
              {
                data: data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
            labels: label,
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    };
    fetchData();
  }, []);
  return <Doughnut data={data} width="100%" height="100%" />;
}

export default StateStatistic;
