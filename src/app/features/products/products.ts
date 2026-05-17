import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent {
  readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Audio',
      price: 129.99,
      rating: 4.6,
      image: 'https://picsum.photos/seed/headphones/400/300',
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Wearables',
      price: 199.0,
      rating: 4.4,
      image: 'https://picsum.photos/seed/watch/400/300',
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      category: 'Accessories',
      price: 89.5,
      rating: 4.8,
      image: 'https://picsum.photos/seed/keyboard/400/300',
    },
    {
      id: 4,
      name: 'USB-C Hub',
      category: 'Accessories',
      price: 39.99,
      rating: 4.2,
      image: 'https://picsum.photos/seed/hub/400/300',
    },
    {
      id: 5,
      name: '4K Monitor',
      category: 'Displays',
      price: 349.0,
      rating: 4.7,
      image: 'https://picsum.photos/seed/monitor/400/300',
    },
    {
      id: 6,
      name: 'Ergonomic Mouse',
      category: 'Accessories',
      price: 49.99,
      rating: 4.5,
      image: 'https://picsum.photos/seed/mouse/400/300',
    },
  ]);
}
