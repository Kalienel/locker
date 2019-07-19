import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_Restaurante(record) {
    return this.firestore.collection('restaurantes').add(record);
  }

  read_Restaurante() {
    return this.firestore.collection('restaurantes').snapshotChanges();
  }

  update_Restaurante(recordID, record) {
    this.firestore.doc('restaurantes/' + recordID).update(record);
  }

  delete_Restaurante(recordId) {
    this.firestore.doc('restaurantes/' + recordId).delete();
  }

}
