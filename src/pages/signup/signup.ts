import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Loading, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import firebase from 'firebase';
@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class signup {
    public signupForm: FormGroup;
    loading: Loading;
    constructor(public navCtrl: NavController, public authProvider: AuthProvider,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			userName:''
        });
    }

    signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {
            this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password,this.signupForm.value.userName)
                .then(() => {
					let user = firebase.auth().currentUser;
//alert("please verify your email ")
                    this.loading.dismiss().then(() => {
                        console.log('login successful');
						this.navCtrl.push('HomePage');
                    });
                }, (error) => {
                    this.loading.dismiss().then(() => {
                        let alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {
                                    text: "Ok",
                                    role: 'cancel'
                                }
                            ]
                        });
                        alert.present();
                    });
                });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }


}
