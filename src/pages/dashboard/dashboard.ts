import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  constructor(public navCtrl: NavController, private http: Http, public toastCtrl : ToastController) {
    this.getAllData()
  }

  getAllData() {
    this.callDashboardWS().then(data => {
      console.log(data);
    }, error => {
      this.showToast('Error occured' + error)
    });
  }

  callDashboardWS() {
    return new Promise((resolve, reject) => {
      var url = 'http://127.0.0.1:3000/user/dashboard';

      var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      this.http.get(url, {
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