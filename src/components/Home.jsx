import React from 'react';
import Card from './Card';
import Navbar from './Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker"

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
//montando a home, mas n temos dados
const Home = () => {
  const [dados, setDados] = useState([])
  //agora vai executar uma vez, as próximas serão em função das variáveis de estado,
  // que estará dentro de [], como está vazio vai executar uma vez 
  //use effect p pegar os dados
  //pegou os dados (api) guardo na variável de estados -- ai tenho dados diferentes e a variavel de estado vai se modificar
  // o componente home será reconstruido considerando os novos dados
  //assim temos a home com os dados da api atuazliada
  
  useEffect(()=>{
    function getData(){

      axios.get('http://127.0.0.1:3000/sensores')
        .then((data) => {
          console.log(data)
          setDados(data.data)
          console.log(data.data.map(x => {
            return x.LUZ
          }))
        })
        .catch((err) => console.log(err))

    }
    getData()
  },[])

  function calcularMediasPorHora(arrayDeObjetos, chaveNumero, medida = true) {
    // Função para calcular médias ou retornar horas correspondentes com base nos dados fornecidos.

    // Cria um mapa para armazenar os valores somados e os contadores para cada hora.
    const mapPorHora = new Map();

    // Itera sobre cada objeto no array de objetos.
    arrayDeObjetos.forEach(objeto => {
        // Extrai a data do objeto e obtém a hora.
        const data = new Date(objeto["data"]);
        const hora = data.getHours();

        // Extrai o valor numérico usando a chave fornecida.
        const numero = objeto[chaveNumero];

        // Verifica se a hora já possui uma entrada no mapa. Se não, cria uma entrada inicial.
        if (!mapPorHora.has(hora)) {
            mapPorHora.set(hora, { soma: 0, contador: 0 });
        }

        // Recupera o valor atual para a hora no mapa e atualiza a soma e o contador.
        const valorAtual = mapPorHora.get(hora);
        valorAtual.soma += numero;
        valorAtual.contador++;
    });

    // Array para armazenar as médias calculadas ou as horas.
    const mediasPorHora = [];

    // Itera sobre as entradas do mapa.
    mapPorHora.forEach((valor, hora) => {
        // Calcula a média dividindo a soma pelo contador.
        const media = valor.soma / valor.contador;

        // Verifica se deve adicionar a média ou a hora ao array final.
        if (medida === true) {
            mediasPorHora.push(media); // Adiciona a média.
        } else {
            mediasPorHora.push(hora); // Adiciona a hora.
        }
    });

    // Retorna o array com as médias ou horas correspondentes.
    return mediasPorHora;
}

  const cards = [
    {
      titulo: "Temperatura",
      corpo: "22cº"
    },
    {
      titulo: "Co2",
      corpo: "400 ppm"
    },
    {
      titulo: "Luminosidade",
      corpo: "1 Lúmen"
    },
    {
      titulo: "Risco",
      corpo: "Sem Risco"
    },
  ]

  const graf2 = {
    labels: calcularMediasPorHora(dados, "LUZ", false),
    datasets: [
      {
        label: 'Luminosidade',
        data: calcularMediasPorHora(dados, "LUZ"),
        backgroundColor: ['#3F51B5']
      }
    ]
  };

  const graf3 = {
    labels: calcularMediasPorHora(dados, "co2", false),
    datasets: [
      {
        label: 'CO2',
        data: calcularMediasPorHora(dados, "co2"),
        backgroundColor: ['#3F51B5']
      }
    ]
  };

  const data = {
    labels: calcularMediasPorHora(dados, "temperatura", false),
    datasets: [
      {
        label: 'Temperatura',
        data: calcularMediasPorHora(dados, "temperatura"),
        backgroundColor: 'rgba(63, 81, 181, 1)',
      },
    ],
  };

  const options = {
    responsive: true
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-5">
        <h1 className="boas-vindas">Bem-vindo à página inicial!</h1>
        <div className="row mt-5">
          {
            cards.map((item, idx) => {
              return (
                <div className="col">
                  <Card title={item.titulo} contentCard={item.corpo} />
                </div>)
            })
          }
        </div>
        <div className="row mt-5">
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Bar data={data} options={options} />
          </div>
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Bar data={graf2} options={options} />
          </div>
          <div className="col mt-5" style={{ height: "150px", width: "150px" }}>
            <Bar data={graf3} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
