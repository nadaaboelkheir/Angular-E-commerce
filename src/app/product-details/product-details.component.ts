import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../../assets/products.json';
import { Product } from '../types/product';
import { CommonModule , NgClass } from '@angular/common';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  products: Array<Product> = products;
  productDetails: Product | any;
  ngOnInit() {
    const paramsId: string = this.activatedRoute.snapshot.params['id'];
    this.productDetails = this.products.find(
      (product: Product) => product.id === Number(paramsId)
    );
  }
}
