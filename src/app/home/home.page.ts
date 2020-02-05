import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  customerDetails;

  loginResponse = JSON.parse(localStorage.getItem('login_details'));
  constructor(public toastController: ToastController, private service: LoginService) {
    console.log('login response ', this.loginResponse);
    this.customerData();
  }

  customerData() {
    let param = { id: this.loginResponse.id, token: this.loginResponse.token, user_type: "customer" };
    console.log('paramter in home page  ', param);
    this.service.customerData(param).subscribe(resp => {
      console.log('response of home service ', resp);
      this.customerDetails = [resp['data']];
    })
  }
}
