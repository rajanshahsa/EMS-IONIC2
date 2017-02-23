import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-expenseDetails',
    templateUrl: 'expenseDetails.html'
})
export class ExpenseDetails {
    xAuthToken
    expenses
    constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, private navParams: NavParams) {
        this.xAuthToken = navParams.get('xAuthToken');
        this.expenses = navParams.get('expenses');
    }

    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }


}