import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {

  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;

  nome: any;
  item: any;

  constructor(
    private db: AngularFirestore,
    private fireStore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Batata", "Refrigerante", "Salgadinho", "Cerveja"],
        datasets: [
          {
            label: "Venda média diária",
            data: [25, 30, 15, 40],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Batata", "Refrigerante", "Salgadinho", "Cerveja"],
        datasets: [
          {
            label: "Porcentagem",
            data: [0.23, 0.28, 0.14, 0.35],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384"]
          }
        ]
      }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        datasets: [
          {
            label: "Faturamento",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3517.36, 5662.61, 7360.93, 12543.87],
            spanGaps: false
          }
        ]
      }
    });


    this.item = this.route.snapshot.paramMap.get('item');
    const docRef = this.db.collection('restaurantes').doc(this.item);
    this.getStorage(docRef)
  }

  async getStorage(docRef){
    try {
      let obj = await docRef.ref.get().then(doc => {
        return {
          nome: doc.data()['Nome'],
          };
        });
      this.nome = obj.nome;
    }
    catch(e) { console.log(e) }
  }

  verEstoque(item) {
    this.router.navigateByUrl('/estoque/' + item.id);
  }

}
