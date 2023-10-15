import Chart from 'chart.js/auto';
import { FC, useEffect } from 'react';

type Props = {
    allocation: number[];
    total: number
}

const ChartUI: FC<Props> = ({allocation, total}: Props) => {
    // Donut Chart Setup
  useEffect(() => {    
    const chartDiv = document.querySelector(".canvas-div");
    const canvas = document.createElement("canvas");
    canvas.classList.add('canvas-chart');

    const allocTotal = allocation.reduce((a,b) => a + b);
    const tokenAlloc = allocation.map(a => Math.round(a/allocTotal * total));

    let chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: [
          'Team',
          'Airdrop',
          'DAO Allocation'
        ],
        datasets: [{
          label: 'Token Distribution',
          data: tokenAlloc,
          backgroundColor: [
            '#FF4906',
            '#19B400',
            '#F3BC51'
          ],
          hoverOffset: 4,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: "rgb(0,0,0,0.0)",
          spacing: 2
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Token Distribution'
          }
        }
      },
    });

    const canvasParent = document.querySelector(".canvas-parent");

    if (document.contains(document.querySelector('.canvas-chart'))) {
      document.querySelector('.canvas-chart').remove()
    }

    canvasParent.insertBefore(canvas, chartDiv);
  }, []);

  return (
    <div className="">
        <div className="canvas-parent">
            <div className="w-96 canvas-div"></div>
        </div>
    </div>
    
  )
}

export default ChartUI;