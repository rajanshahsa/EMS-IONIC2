import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { User } from '../../models/user';

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
    constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController) {
    }

    btnRegistrationClicked() {
        console.log(this.EmailId);
        console.log(this.Username);
        console.log(this.password);
        console.log(this.Confirmpassword);
        console.log(this.MobileNo);
        console.log(this.Sex);
        this.callRegistrationAPI().then(data => {
            console.log(data);
            let userData = data["data"]
            let user = new User(userData);
            console.log('Username' + user.username);
            this.showToast('Successfully Registration' + user.username)
            this.navCtrl.push(Dashboard, { "xAuthToken": data["xAuthToken"] });
        }, error => {
            this.showToast('Error occured' + error)
        });
    }


    callRegistrationAPI() {
        return new Promise((resolve, reject) => {
            var url = 'http://127.0.0.1:3000/user/signUp';
            let body = {
                emailId: this.EmailId,
                password: this.password,
                mobileNo: this.MobileNo,
                userName: this.Username,
                sex: this.Sex,
                userType: "user"
            }
            console.log(body);
            var headers = new Headers();
            // headers.append('Content-Type', 'application/json');
            this.http.post(url, body, {
                headers: headers
            }).map(res => res.json()).subscribe(data => {
                data = data;
                resolve(data);
            }, error => reject(error), () => console.log("Finished"));
        });
    }


    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }
}