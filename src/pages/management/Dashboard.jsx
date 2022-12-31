import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

function BarChart() {
  const labels = ["Rozna", "Šiška", "BTC"];
  const data = [174, 150, 10];

  return (
    <div style={{ height: 400 }}>
      <Bar
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "My most popular locations",
              data,
              backgroundColor: data.map((_) => randomRGB()),
            },
          ],
        }}
      />
    </div>
  );
}

function BarChart2() {
  const labels = ["Igrisce 1", "Igrisce 2", "Fitnes"];
  const data = [174, 150, 10];

  return (
    <div style={{ height: 400 }}>
      <Bar
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "My most popular courts",
              data,
              backgroundColor: data.map((_) => randomRGB()),
            },
          ],
        }}
      />
    </div>
  );
}

export default () => {
  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="main-container">
        <div className="page-header header-row">
          <div className="page-header">
            <h4 style={{ marginBottom: 0 }}>Dashboard</h4>
          </div>
        </div>
        <BarChart />
        <BarChart2 />
      </div>
    </div>
  );
};
