import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommanService } from '../service/comman.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public loginService: LoginService, private navCtrl: NavController, public commanService: CommanService, public loadingCtrl: LoadingController, public router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async getLogin() {
    let loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    loading.present();
    let param = { email: this.loginForm.value.email, password: this.loginForm.value.password, user_type: 'customer' };
    this.loginService.loginAuthWithUser(param).subscribe((resp) => {
      loading.dismiss();
      if (resp['status'] == '200') {
        this.commanService.presentToast(resp['message']);
        this.navCtrl.navigateForward('home');
        localStorage.setItem('login_details', JSON.stringify(resp));
      } else {
        this.commanService.presentToast(resp['message']);
      }
    }, err => {
      console.log('inside error ', err);
    })
  }
}
