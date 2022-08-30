import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {map, Observable} from 'rxjs';
import {models} from './models'
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  usersColl!: AngularFirestoreCollection<models.user>;
  winnersColl!: AngularFirestoreCollection<models.winner>;
  winnerDoc!: AngularFirestoreDocument
  items: any;
  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
    ) {
      this.winnersColl=this.firestore.collection('winners')
      this.items = this.firestore.collection('winners').snapshotChanges().pipe(
        map((a:any)=>{
          return a.map((a:any)=>{
            const data = a.payload.doc.data() as models.winner;
            data.id = a.payload.doc.id
            return data
          })
        })
      )
  }

  getUsers(): Observable<models.user> | any {
    return this.firestore.collection('users').valueChanges();
  }

  getWinners(): Observable<models.winner> | any {
    // return this.firestore.collection('winners').valueChanges();
    return this.items

  }
  addToWinners(doc: models.user){
    this.winnersColl.add(doc)
  }
  deleteWinner(id:any){
    // return this.firestore.doc('winners/' + id).delete();
    console.log(id)
    this.firestore.collection('winners').doc(id).delete()
  }

  delete(winnerId: string){
    this.firestore.doc('winners/' + winnerId).delete();
}
}


