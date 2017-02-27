import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Dashboard } from '../pages/dashboard/dashboard'
import { Registration } from '../pages/registration/registration'
import { ExpenseDetails } from '../pages/expenseDetails/expenseDetails'
import { AddExpense } from '../pages/addExpense/addExpense'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Dashboard,
    Registration,
    ExpenseDetails,
    AddExpense
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Dashboard,
    Registration,
    ExpenseDetails,
    AddExpense
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
