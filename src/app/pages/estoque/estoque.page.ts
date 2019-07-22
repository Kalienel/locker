import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
})
export class EstoquePage implements OnInit {

  @ViewChild("barCanvas") barCanvas: ElementRef;

  private barChart: Chart;

  constructor(
    public alertController: AlertController,
    private navCtrl: NavController
  ) { }

  async alerta() {
    const alert = await this.alertController.create({
      header: 'Deseja realizar essa compra?',
      subHeader: '',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Compra cancelada');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.navCtrl.navigateRoot('/confirmada');
            console.log('Compra realizada');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Batata", "Refrigerante", "Salgadinho", "Cerveja"],
        datasets: [
          {
            label: "Quantidade",
            data: [46, 120, 64, 100],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
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

  }

}
