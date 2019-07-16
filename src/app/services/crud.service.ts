import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  criar_restaurantes(record) {
    return this.firestore.collection('restaurantes').add(record);
  }

  ler_restaurantes() {
    return this.firestore.collection('restaurantes').snapshotChanges();
  }

  deletar_restaurantes(recordId) {
    this.firestore.doc('restaurantes/' + recordId).delete();
  }

}
