import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrl: './frontend-header.component.css',
})
export class FrontendHeaderComponent implements OnInit {
  carts: any = [];
  location: any
  constructor(private cartService: CartService, private toast: ToastrService, private locationService: LocationService) {}
  ngOnInit(): void {
    this.getCarts()
    this.getLocation()
  }

  getCarts() {
    this.cartService.carts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  remove(course_id: number) {
    this.cartService.removeCart(course_id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success');
      this.getCarts();
    });
  }

  computeTotal(){
    let total: number = 0
    let carts = this.carts
    for (let index = 0; index < carts.length; index++) {
      total += carts[index].price;

    }
    return total
  }

  getLocation() {
    this.locationService.location().subscribe((res: any) => {
      this.location = res;
    });
  }
}
