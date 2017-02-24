import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { ExpenseDetails } from '../expenseDetails/expenseDetails'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  xAuthToken
  expensesArray
  constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, private navParams: NavParams) {
    this.xAuthToken = navParams.get('xAuthToken');
    this.getAllData()
  }

  getAllData() {
    console.log("xAuthToken:  " + this.xAuthToken);
    this.callDashboardWS().then(data => {
      console.log(data);
      this.expensesArray = data;
    }, error => {
      console.log("xAuthToken:  " + this.xAuthToken);
      this.showToast('Error occured' + error)
    });
  }

  callDashboardWS() {
    console.log("xAuthToken:  " + this.xAuthToken);
    return new Promise((resolve, reject) => {
      var url = 'http://127.0.0.1:3000/user/dashboard';
      var headers = new Headers();
      headers.append('xAuthToken', this.xAuthToken);
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

  didAssign(expense: any): void {
    console.log("Hello " + expense);
    console.log("Navigation" + this.navCtrl);
    this.navCtrl.push(ExpenseDetails, { "xAuthToken": this.xAuthToken, "expenses": expense });
  }
}