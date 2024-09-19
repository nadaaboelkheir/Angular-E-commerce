import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { products } from '../../assets/products.json';
import { Product } from '../types/product';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Array<Product> = products;
  filteredProducts: Array<Product> = products;
  searchTerm: string = '';
  searchPerformed: boolean = false;

  ngOnInit(): void {
    console.log(this.products);
  }

  // Method to handle the search when the search button is clicked
  performSearch(): void {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
    this.searchPerformed = true;
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filteredProducts = this.products;
    this.searchPerformed = false;
  }

  
}
