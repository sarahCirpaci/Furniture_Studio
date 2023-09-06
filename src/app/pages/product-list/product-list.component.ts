import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BehaviorSubject, combineLatest, tap} from "rxjs";
import {LOADING_PRODUCTS_STATE, Product} from "../../models/product";
import {PageInformation, PaginatorComponent} from "../../components/paginator/app-paginator/paginator.component";
import {PageEvent} from "@angular/material/paginator";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {ProductListPaginated} from "../../models/pagination";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CartService} from "../../services/cart.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, NgOptimizedImage, RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductList {
  protected productsPaginated$: BehaviorSubject<ProductListPaginated | null> = new BehaviorSubject<ProductListPaginated | null>(null)
  public pageInfo: PageInformation = {
    currentPage: 1,
    size: 10,
    numberOfItems: 10
  }
  private categoryId: number = 1;
  private pageIndex: number = 1;
  protected searchString: string = '';
  protected routes = GLOBAL_CONSTANTS.routes
  protected LOADING_PRODUCTS_STATE = LOADING_PRODUCTS_STATE.NOT_STARTED;
  protected readonly GLOBAL_CONSTANTS = GLOBAL_CONSTANTS;

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar
  ) {
    combineLatest({
      params: this.activatedRoute.params,
      queryParams: this.activatedRoute.queryParams
    }).pipe(
      tap(({params, queryParams}) => {
        this.categoryId = params['category'];
        this.pageIndex = params['page'];
        this.searchString = queryParams['search']
        return this.fetchingProducts(params['category'], params['page'], queryParams['search']);
      })
    ).subscribe()
  }


  changePage(event: PageEvent) {
    this.router.navigate([`${GLOBAL_CONSTANTS.routes.PRODUCTS_PAGE}/${event.pageIndex}/${this.categoryId}`], {queryParams: {search: this.searchString}})
  }

  fetchingProducts(categoryId: number, pageIndex: number, searchString: string) {
    this.LOADING_PRODUCTS_STATE = LOADING_PRODUCTS_STATE.LOADING
    const rangeMin = (pageIndex - 1) * 10;
    const rangeMax = rangeMin + 10 - 1;
    if (searchString === undefined || searchString === null || searchString === '') {
      this.fetchByCategory(categoryId, pageIndex, rangeMin, rangeMax)
    } else {
      this.fetchByCategoryAndSearch(categoryId, pageIndex, rangeMin, rangeMax, searchString)
    }
  }

  fetchByCategory(categoryId: number, pageIndex: number, rangeMin: number, rangeMax: number) {
    this.productService.getProductsByCategoryId(categoryId, rangeMin, rangeMax).subscribe({
      next: (products) => {
        this.pageInfo.size = products.size
        this.productsPaginated$.next(products);
        this.pageInfo.currentPage = pageIndex
        this.LOADING_PRODUCTS_STATE = LOADING_PRODUCTS_STATE.FINISHED
      },
      error: () => {
        this.snackBar.open("Error on initializing products", "Close", {
          duration: 4000,
          panelClass: 'snackbar-error'
        })
      }
    })
  }

  fetchByCategoryAndSearch(categoryId: number, pageIndex: number, rangeMin: number, rangeMax: number, searchString: string) {
    this.productService.fetchProductsByCategoryAndSearch(categoryId, rangeMin, rangeMax, searchString).subscribe({
      next: (products) => {
        this.pageInfo.size = products.size
        this.productsPaginated$.next(products);
        this.pageInfo.currentPage = pageIndex
        this.LOADING_PRODUCTS_STATE = LOADING_PRODUCTS_STATE.FINISHED
      },
      error: () => {
        this.snackBar.open("Error on initializing products", "Close", {
          duration: 4000,
          panelClass: 'snackbar-error'
        })
      }
    })
  }

  searchProduct(searchWord: string) {
    if (searchWord) {
      this.router.navigate([`/products/${this.pageIndex}/${this.categoryId}`], {queryParams: {search: searchWord}});
    } else {
      this.router.navigate([`/products/${this.pageIndex}/${this.categoryId}`])
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }
}
