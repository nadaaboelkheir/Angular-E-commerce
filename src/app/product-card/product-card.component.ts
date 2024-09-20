import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../types/product';
import { CartService } from '../requests/cart.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule], // <-- Import CommonModule here
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productItem!: Product;
  cartItems: number[] = [];
  quantity: number = 0;
  constructor(private router: Router, private cart: CartService) {}

  ngOnInit() {
    this.cart.getCart().subscribe((cart) => {
      this.cartItems = cart;
    });
  }
  showProductDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }

  addToCart(id: number) {
    this.cartItems.push(id);
    this.cart.updateCart(this.cartItems);
    this.quantity += 1;
   
  }
}
