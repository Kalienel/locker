import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit {

  nome: any;
  item: any;

  constructor(
    private db: AngularFirestore,
    private fireStore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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

}
