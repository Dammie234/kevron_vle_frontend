import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  key!: string;
  constructor(private cookieService: CookieService, private http: HttpClient) {}
  generateString() {
    let result = '';
    let length = 20;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  addToCart(course_id: number, country: any) {
    if (this.cookieService.get('key')) {
      this.key = this.cookieService.get('key');
    } else {
      this.key = this.generateString();
      const dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 24);
      this.cookieService.set('key', this.key, dateNow); //cookie for 1 day
    }

    return this.http.get(environment.APP_URL +
      `add-to-cart/${course_id}/${this.key}/${country}`
    );
  }

  carts(){
    this.key = this.cookieService.get('key');
    return this.http.get(environment.APP_URL +
      `carts/${this.key}`
    );
  }

  removeCart(course_id: number){
    this.key = this.cookieService.get('key');
    return this.http.get(environment.APP_URL + `remove-cart/${course_id}/${this.key}`)
  }
}
