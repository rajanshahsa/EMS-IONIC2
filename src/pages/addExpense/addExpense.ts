import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-addExpense',
    templateUrl: 'addExpense.html'
})
export class AddExpense {
    xAuthToken
    userArray
    constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, private navParams: NavParams, public alertCtrl: AlertController) {
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
                tempUserArray.push(user);
            }
            this.userArray = tempUserArray
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

    showAlert() {
        console.log("AlertController: " + this.alertCtrl);
        let prompt = this.alertCtrl.create({
            title: 'EMS',
            message: "Enter a name & Amount of contributor",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                },
                {
                    name: 'amount',
                    placeholder: 'Amount'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }
}