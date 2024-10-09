import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  carts: any = [];
  location: any;
  constructor(
    private cartService: CartService,
    private toast: ToastrService,
    private router: Router,
    private locationService: LocationService
  ) {}
  ngOnInit(): void {
    this.getCarts();
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

  getLocation() {
    this.locationService.location().subscribe((res: any) => {
      this.location = res;
    });
  }
}
