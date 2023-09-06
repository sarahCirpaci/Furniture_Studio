import {Injectable} from "@angular/core";
import {SupabaseService} from "./supabase.service";
import {GLOBAL_CONSTANTS} from "../global-constants/global-constants";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {ProductCategory} from "../models/product_category";
import {ProductListPaginated} from "../models/pagination";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly supaBaseService: SupabaseService) {
  }

  getProductById(id: number): Observable<Product> {
    return new Observable<Product>((observer) => {
      this.supaBaseService.getSupaBase().from(GLOBAL_CONSTANTS.PRODUCT)
        .select()
        .eq('id', id)
        .then((result) => {
          if (result.data && result.data[0]) {
            const product = result.data[0];
            observer.next(product);
            observer.complete();
          } else {
            observer.error(new Error('Product not found'));
            return;
          }
        })
    });
  }

  getCategories(): Observable<ProductCategory[]> {
    return new Observable<ProductCategory[]>((observer) => {
      this.supaBaseService.getSupaBase().from(GLOBAL_CONSTANTS.PRODUCT_CATEGORY)
        .select()
        .then((result) => {
          if (result.data && result.data) {
            const product = result.data;
            observer.next(product);
          } else {
            observer.error(new Error('Product Categories not found'));
            return;
          }
        })
    });
  }
  getProductsByCategoryId(id: number, rangeMin: number = 0, rangeMax: number = 9): Observable<ProductListPaginated> {
    return new Observable<ProductListPaginated>((observer) => {
      this.supaBaseService.getSupaBase().from(GLOBAL_CONSTANTS.PRODUCT)
        .select("*", {count: "exact"})
        .eq('product_category_id', id)
        .range(rangeMin, rangeMax)
        .then((result) => {
          if (result.data) {
            const product: ProductListPaginated = {
              productList: result.data,
              size: result.count ?? 0
            };
            observer.next(product);
            observer.complete();
          } else {
            observer.error(new Error('Products not found'));
            return;
          }
        })
    });
  }
  fetchProductsByCategoryAndSearch(id: number, rangeMin: number = 0, rangeMax: number = 9, searchWord: string): Observable<ProductListPaginated> {
    return new Observable<ProductListPaginated>((observer) => {
      this.supaBaseService.getSupaBase().from(GLOBAL_CONSTANTS.PRODUCT)
        .select("*",{count: "exact"})
        .eq('product_category_id', id)
        .textSearch('name', `${searchWord}`)
        .range(rangeMin, rangeMax)
        .then((result) => {
          if (result.data) {
            const product: ProductListPaginated = {
              productList: result.data,
              size: result.count ?? 0
            };
            observer.next(product);
            observer.complete();
          } else {
            observer.error(new Error('Products not found'));
            return;
          }
        })
    });
  }
}
