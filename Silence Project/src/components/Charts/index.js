// components/CharacterChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const CharacterChart = ({ attributes }) => {
  const categoryColors = [
    'rgba(255,99,132,0.4)',
    'rgba(54,162,235,0.4)',
    'rgba(255,206,86,0.4)',
    'rgba(75,192,192,0.4)',
    'rgba(153,102,255,0.4)',
    'rgba(255,159,64,0.4)',
    'rgba(205,92,92,0.4)',
    'rgba(0,128,0,0.4)',
    'rgba(255,140,0,0.4)',
    'rgba(0,191,255,0.4)',
    'rgba(255,69,0,0.4)',
    'rgba(128,0,128,0.4)',
    'rgba(173,216,230,0.4)',
    'rgba(255,165,0,0.4)',
    'rgba(0,255,255,0.4)',
  ];

  // Mapeando cores com base nas categorias
  const dynamicColors = [];
  const dynamicData = {
    labels: [],
    datasets: [],
  };

  // Iterando sobre as categorias
  Object.keys(attributes).forEach((category, i) => {
    const categoryAttributes = attributes[category];
    const categoryColor = categoryColors[i];

    // Adicionando atributos à lista de labels
    dynamicData.labels = [
      ...dynamicData.labels,
      ...Object.keys(categoryAttributes),
    ];

    // Adicionando dados do conjunto de dados
    dynamicData.datasets.push({
      label: category,
      backgroundColor: 'rgba(0,0,0,0)', // Fundo transparente
      borderColor: Array(Object.keys(categoryAttributes).length).fill(
        categoryColor,
      ),
      pointBackgroundColor: Array(Object.keys(categoryAttributes).length).fill(
        categoryColor,
      ),
      pointBorderColor: Array(Object.keys(categoryAttributes).length).fill(
        categoryColor,
      ),
      pointHoverBackgroundColor: Array(
        Object.keys(categoryAttributes).length,
      ).fill(
        categoryColor ? categoryColor.replace('0.4', '0.6') : 'rgba(0,0,0,0)',
      ),
      data: Object.values(categoryAttributes),
    });

    // Adicionando cores à lista de cores dinâmicas
    dynamicColors.push(
      ...Array(Object.keys(categoryAttributes).length).fill(categoryColor),
    );
  });

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255,255,255,0.2)', // Cor das linhas de cada atributo
        },
        pointLabels: {
          fontColor: 'rgba(255,255,255,0.8)', // Cor do texto dos pontos
        },
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(255,255,255,0.2)', // Cor da grade radial
        },
        beginAtZero: true,
      },
    },
  };

  return <Radar data={dynamicData} options={options} />;
};

export default CharacterChart;
