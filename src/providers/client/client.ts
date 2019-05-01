import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Injectable()
export class ClientProvider {
private userId: string;
  constructor(public afAuth: AngularFireAuth, public  firestore: AngularFirestore) {
	      this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
    });

    console.log('Hello ClientProvider Provider');
  }

    async createClient(
    fullName: string,
    email: string,
    startingWeight: number
  ): Promise<any> {
    const newClientRef = await this.firestore
      .collection(`userProfile/${this.userId}/clientList/`)
      .add({});

    return newClientRef.set({
      id: newClientRef.id,
      fullName,
      email,
      startingWeight: startingWeight * 1,
    });
  }

  listClients(): AngularFirestoreCollection<any> {
    return this.firestore.collection(`userProfile/${this.userId}/clientList/`);
  }

    clientDetails(clientId: string): AngularFirestoreDocument<any> {
    return this.firestore.doc(`userProfile/${clientId}`);
  }

  clientTrackWeight(weight: number): Promise<firebase.firestore.DocumentReference> {
    return this.firestore.collection(`userProfile/${this.userId}/weightTrack/`).add({
      weight: weight,
      date: firebase.firestore.Timestamp,
    });
  }

    clientWeightHistory(): AngularFirestoreCollection<any> {
    return this.firestore.collection(`userProfile/${this.userId}/weightTrack`, ref =>
      ref.orderBy('date').limit(5)
    );
  }

  clientWeightHistoryCoach(clientId: string): AngularFirestoreCollection<any> {
    return this.firestore.collection(`userProfile/${clientId}/weightTrack`, ref =>
      ref.orderBy('date').limit(5)
    );
  }

}
