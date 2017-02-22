import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http} from '@angular/http';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  constructor(public navCtrl: NavController, private http: Http) {
  }
}