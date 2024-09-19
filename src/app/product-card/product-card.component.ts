import { Component, Input, Output ,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../types/product';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],  // <-- Import CommonModule here
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() productItem!: Product ;
@Output() sendToParent = new EventEmitter<number>();

constructor(private router :Router) { }
showProductDetails(id:number){
  this.router.navigate(['/product-details',id]);
}
}
