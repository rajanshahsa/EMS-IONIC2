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
    zones
    constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, private navParams: NavParams) {
        this.xAuthToken = navParams.get('xAuthToken');
        this.zones = ["Rajan", "Deepak", "Devang"]
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
        this.callGetUserWS().then(data => {
            let userData = data["data"]
            for (let i = 0; i < data["data"].length; i++) {
                let tempData = data["data"][i]
                console.log("Temp " + i + " Data " + tempData)
            }
            console.log("User Array  " + userData)
            this.userArray = data;
        }, error => {
            this.showToast('Error occured' + error)
        });
    }

    callGetUserWS() {
        return new Promise((resolve, reject) => {
            var url = 'http://127.0.0.1:3000/user/getUser';
            var headers = new Headers();
            headers.append('xAuthToken', this.xAuthToken);
            this.http.get(url, {
                headers: headers
            }).map(res => res.json()).subscribe(data => {
                data = data;
                console.log("Hello" + data)
                resolve(data);
            }, error => reject(error), () => console.log("Finished"));
        });
    }

}