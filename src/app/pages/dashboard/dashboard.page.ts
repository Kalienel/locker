import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../../services/auth.service';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  userEmail: string;
  restaurantes: any;
  capa: any;
  restauranteNome: any;
  restauranteTipo: any;
  restauranteEstrelas: any;
  restauranteDist: any;
  restauranteDesc: any;
  // tslint:disable-next-line: max-line-length
  restauranteCapa = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/T%C3%ADpico_quiosque_da_Praia_de_Boa_Viagem_-_Recife%2C_Pernambuco%2C_Brasil.jpg/800px-T%C3%ADpico_quiosque_da_Praia_de_Boa_Viagem_-_Recife%2C_Pernambuco%2C_Brasil.jpg';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private crudService: CrudService,
    public alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit(){

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

    this.crudService.read_Restaurante().subscribe(data => {

      this.restaurantes = data.map(e => {
        this.capa = e.payload.doc.data()['Capa']
        return {
          id: e.payload.doc.id,
          Estrelas: e.payload.doc.data()['Estrelas'],
          Nome: e.payload.doc.data()['Nome'],
          Tipo: e.payload.doc.data()['Tipo'],
          Dist: e.payload.doc.data()['Dist'],
          Desc: e.payload.doc.data()['Desc'],
          Capa: e.payload.doc.data()['Capa'],
        };
      })
      console.log(this.restaurantes);

    });
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  verEstab(item) {
    this.router.navigateByUrl('/estabelecimento/' + item.id);
  }

  async Confirmar(i) {
    const alert = await this.alertController.create({
      header: 'DELETAR ESTABELECIMENTO!',
      message: 'Deseja apagar seu estabelecimento do sistema? <strong>Essa são não pode ser revertida</strong>!!!',
      buttons: [
        {
          text: 'Deletar',
          role: 'delete',
          cssClass: 'secondary',
          handler: () => {
            this.RemoveRecord(i)  ;
          }
        }, {
          text: 'Voltar',
          handler: () => {
            console.log('Voltou');
          }
        }
      ]
    });

    await alert.present();
  }

  CreateRecord() {
    this.restauranteEstrelas = Math.round( Math.random() * 50 ) / 10;
    this.restauranteDist = Math.round( Math.random() * 2000 ) / 100;
    let record = {};
    record['Nome'] = this.restauranteNome;
    record['Tipo'] = this.restauranteTipo;
    record['Estrelas'] = this.restauranteEstrelas;
    record['Dist'] = this.restauranteDist;
    record['Desc'] = this.restauranteDesc;
    record['Capa'] = this.restauranteCapa;
    this.crudService.create_Restaurante(record).then(resp => {
      this.restauranteNome = "";
      this.restauranteTipo = "";
      this.restauranteEstrelas = "";
      this.restauranteDist = "";
      this.restauranteDesc = "";
      // tslint:disable-next-line: max-line-length
      this.restauranteCapa = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Restaurante(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditNome = record.Nome;
    record.EditTipo = record.Tipo;
    record.EditEstrelas = record.Estrelas;
    record.EditDist = record.Dist;
    record.EditDesc = record.Desc;
    record.EditCapa = record.Capa;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Nome'] = recordRow.EditNome;
    record['Tipo'] = recordRow.EditTipo;
    record['Estrelas'] = recordRow.EditEstrelas;
    record['Dist'] = recordRow.EditDist;
    record['Desc'] = recordRow.EditDesc;
    record['Capa'] = recordRow.EditCapa;
    this.crudService.update_Restaurante(recordRow.id, record);
    recordRow.isEdit = false;
  }

}