import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-addExpense',
    templateUrl: 'addExpense.html'
})
export class AddExpense {
    xAuthToken
    userArray

    constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, private navParams: NavParams) {
        this.xAuthToken = navParams.get('xAuthToken');
        this.getAllData()
    }

    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }

    getAllData() {
        console.log("xAuthToken:  " + this.xAuthToken);
        this.callGetUserWS().then(data => {
            console.log(data);
            this.userArray = data;
        }, error => {
            console.log("xAuthToken:  " + this.xAuthToken);
            this.showToast('Error occured' + error)
        });
    }

    callGetUserWS() {
        console.log("xAuthToken:  " + this.xAuthToken);
        return new Promise((resolve, reject) => {
            var url = 'http://127.0.0.1:3000/user/getUser';
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

}