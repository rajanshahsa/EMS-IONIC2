import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/user';
@Component({
    selector: 'page-addExpense',
    templateUrl: 'addExpense.html'
})
export class AddExpense {
    xAuthToken
    userArray
    constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, private navParams: NavParams) {
        this.xAuthToken = navParams.get('xAuthToken');
        this.getAllData();
    }

    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }

    getAllData() {
        let tempUserArray = []
        this.callGetUserWS().then(data => {
            let userData = data["data"];
            for (let i = 0; i < userData.length; i++) {
                let tempData = userData[i];
                let user = new User(tempData);
                console.log("Temp " + i + " Data " + user.username);
                tempUserArray.push(user);
            }
            this.userArray = tempUserArray
            console.log("User Array  " + this.userArray)
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