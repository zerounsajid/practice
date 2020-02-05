import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  options = {
    headers: new HttpHeaders({
      'Client-Service': 'frontend-client',
      'Auth-Key': 'technokeens',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Headers': '*'
    })
  }
  constructor(public http: HttpClient) { }

  loginAuthWithUser(data) {
    return this.http.post('https://www.availablepro.co.uk/index.php/api/Front/app_login', data, this.options);
  }

  getTechnokeenKey() {
    return 'technokeens_Pune';
  }

  customerData(param) {
    let options = {
      headers: new HttpHeaders({
        'Client-Service': 'frontend-client',
        'Auth-Key': 'technokeens',
        'Token': param.token,
        'Access-Control-Allow-Headers': '*',
      })
    }
    return this.http.post('https://www.availablepro.co.uk/index.php/api/Admin/get_user_data', param, options);
  }


}
