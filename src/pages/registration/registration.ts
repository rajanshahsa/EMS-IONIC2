import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html'
})
export class Registration {
    EmailId
    Username
    password
    Confirmpassword
    MobileNo
    Sex
    constructor(public navCtrl: NavController, private http: Http) {
    }

    btnRegistrationClicked() {
        console.log(this.EmailId);
        console.log(this.Username);
        console.log(this.password);
        console.log(this.Confirmpassword);
        console.log(this.MobileNo);
        console.log(this.Sex);
    }
}