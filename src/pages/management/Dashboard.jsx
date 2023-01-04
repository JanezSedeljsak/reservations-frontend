import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getManagementAnalytics } from "../../actions/management";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CircularProgress, Box } from "@mui/material";

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

function LocationsChart({ locations }) {
  const labels = locations.map((x) => x.name);
  const data = locations.map((x) => x.count);

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

function CourtsChart({ courts }) {
  const labels = courts.map((x) => x.name);
  const data = courts.map((x) => x.count);

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
  const dispatch = useDispatch();
  const analytics = useSelector((store) => store.management?.analytics ?? []);
  const loading = useSelector((store) => store.management.loading);

  const [locations, setLocations] = useState([]);
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    dispatch(getManagementAnalytics());
  }, []);

  useEffect(() => {
    const locationCounter = {};
    const courtsCounter = {};

    for (const log of analytics) {
      if (log.log_type === "court_detail") {
        const key = log?.court?.id;
        if (!key) continue;

        courtsCounter[key] = {
          count: 1 + (courtsCounter?.[key]?.count ?? 0),
          name: log?.court?.name,
        };
      } else if (log.log_type === "location_detail") {
        const key = log?.locaiton?.id;
        if (!key) continue;

        locationCounter[key] = {
          count: 1 + (courtsCounter?.[key] ?? 0),
          name: log?.location?.name,
        };
      }
    }

    setLocations(
      Object.keys(locationCounter).map((location) => ({
        name: locationCounter[location].name,
        count: locationCounter[location].count,
      }))
    );

    setCourts(
      Object.keys(courtsCounter).map((court) => ({
        name: courtsCounter[court].name,
        count: courtsCounter[court].count,
      }))
    );
  }, [analytics]);

  function ChartsOrLoading() {
    if (loading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <>
        <LocationsChart
          locations={locations.sort((a, b) => b.count - a.count).slice(0, 10)}
        />
        <CourtsChart
          courts={courts.sort((a, b) => b.count - a.count).slice(0, 10)}
        />
      </>
    );
  }

  return (
    <div className="center" style={{ marginTop: 20 }}>
      <div className="main-container">
        <div className="page-header header-row">
          <div className="page-header">
            <h4 style={{ marginBottom: 0 }}>Dashboard</h4>
          </div>
        </div>
        {ChartsOrLoading()}
      </div>
    </div>
  );
};
