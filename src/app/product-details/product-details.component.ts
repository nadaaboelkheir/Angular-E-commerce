import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import { CommonModule, NgClass } from '@angular/common';
import { ProductService } from '../requests/product.service';
import { CartService } from '../requests/cart.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  products: Array<Product> = [];
  productDetails: Product | any;
  quantity: number = 1;
  cartItems: number[] = [];

  ngOnInit() {
    const paramsId: string = this.activatedRoute.snapshot.params['id'];
    this.productService
      .getProductDetail(paramsId)
      .subscribe((data) => (this.productDetails = data));
      this.cartService.getCart().subscribe((cart) => {
        this.cartItems = cart;
      });

  }
  increment() {
    this.quantity++;
  }
  decrement() {
    if (this.quantity> 1) {
      this.quantity--;
    }
  }
  addToCart(id: number) {
    if(this.quantity>0){
      for(let i=0;i<this.quantity ;i++){
        this.cartItems.push(id)
      }
    }
  this.cartService.updateCart(this.cartItems)
  }
   
  
}
