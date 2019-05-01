import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFirestore } from '@angular/fire/firestore'; 
import * as firebase from 'firebase/app'; 
import 'firebase/firestore'; 
@Injectable()
export class AuthProvider {
public userId: string = null; 
  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore) {
	  this.afAuth.authState.subscribe(user => { 
	  if (user) { 
	  this.userId = user.uid; 
	  } 
	  }); 
    console.log('Hello AuthProvider Provider');
  }

  loginUser(email: string, password: string, name:string): Promise<any> { 
  return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
	 			let user = firebase.auth().currentUser;
			user.updateProfile({
				displayName:name,
				photoURL:""
				}); 
  });
  }
  
  signupUser(email: string, password: string, fullName: string): Promise<any> {
	  return this.afAuth.auth .createUserWithEmailAndPassword(email, password) .then(userCredential => { 
	  this.firestore.doc(`/userProfile/${userCredential.user.uid}`).set({ 
	  admin: true, 
	  email, 
	  fullName, 
	  }); 
	  }); 
	  }
	  
	logoutUser(): Promise<void> { 
	return this.afAuth.auth.signOut(); 
	}  
	
	resetPassword(email: string): Promise<void> { 
	return this.afAuth.auth.sendPasswordResetEmail(email); 
	}
	
	isAdmin(): Promise<boolean> { 
	return new Promise((resolve, reject) => { 
	firebase .firestore() .doc(`userProfile/${this.userId}`) .get() .then(adminSnapshot => { 
	resolve(adminSnapshot.data().admin); 
	}); 
	}); 
	}
	

}
