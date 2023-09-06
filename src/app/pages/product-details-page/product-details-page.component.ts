import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../models/product";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {MatButtonModule} from "@angular/material/button";
import {CartService} from "../../services/cart.service";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatExpansionModule],
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {

  private productId: number;
  protected product!: Product;
  protected readonly GLOBAL_CONSTANTS = GLOBAL_CONSTANTS;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService) {
    this.productId = Number(this.activatedRoute.snapshot.params['product']);
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(product => this.product = product)
  }

  addToCart(product: Product){
    this.cartService.addToCart(product)
  }
}
