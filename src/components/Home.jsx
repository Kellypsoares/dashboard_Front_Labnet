import React from 'react';
import Card from './Card';
import Navbar from './Navbar';
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
);

const Home = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['red', 'blue', 'yellow']
      }
    ]
  };

  const options = {
    responsive: true
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-5">
        <h1>Bem-vindo à página inicial!</h1>
        <div className="row mt-5">
          <div className="col">
            <Card title="Card 1" />
          </div>
          <div className="col">
            <Card title="Card 2" />
          </div>
          <div className="col">
            <Card title="Card 3" />
          </div>
          <div className="col">
            <Card title="Card 4" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Doughnut data={data} options={options} />
          </div>
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Bar data={data} options={options} />
          </div>
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Line data={data} options={options} />
          </div>
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
