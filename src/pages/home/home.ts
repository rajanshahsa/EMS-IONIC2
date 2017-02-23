import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { User } from '../../models/user';
import { ToastController } from 'ionic-angular';
import { Registration } from '../registration/registration';

declare var window: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  userInput = ""
  password = ""
  constructor(public navCtrl: NavController, private http: Http, public alertCtrl: AlertController, public platform: Platform, public toastCtrl: ToastController) {
  }

  btnLoginClicked() {
    if (this.userInput === "" && this.password === "") {
      this.showToast('UserName & Password is compulsory.');
    }
    else {
      console.log("btnLoginClicked");
      this.callLoginAPI().then(data => {
        console.log(data);
        let userData = data["data"]
        let user = new User(userData);
        console.log('Username' + user.username);
        this.showToast('Successfully Login' + user.username)
        this.navCtrl.push(Dashboard);
      }, error => {
        this.showToast('Error occured' + error)
      });
    }
  }

  callLoginAPI() {
    return new Promise((resolve, reject) => {
      var url = 'http://127.0.0.1:3000/user/login';
      let body = {
        emailId: this.userInput,
        password: this.password
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

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  navigateUserToRegister() {
    this.navCtrl.push(Registration);
  }
}
