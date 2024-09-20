import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../types/product';
import { ProductService } from '../requests/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductList().subscribe((data) => {
      this.products = data.products;
      this.filteredProducts = data.products; 
    });
  }

  searchProducts(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products; 
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
