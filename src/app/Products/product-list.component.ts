import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:[ './product-list.component.css']

})

export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = "Product List";
    imageWidth: number=50;
    imageMargin:number=2;
    showImage: boolean = false;
    errorMessage:string =' ';
    sub! : Subscription;
  
   
    private _listFilter: string= ' ';
    // productService: any;
    get listFilter(): string{
      return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter=value;
      console.log('In setter:', value);
      this.filteredProducts= this.performFilter(value);
    }

    filteredProducts: IProduct[]= [];
    products:IProduct[] = [];

    constructor(private productService:ProductService){

    }


    toggleImage(): void{
      this.showImage = !this.showImage;
    }

  
    ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: (err: string) => this.errorMessage = err
      });
    }
  
    ngOnDestroy(): void {
      if (this.sub) {
        this.sub.unsubscribe(); // Unsubscribe the subscription to avoid memory leaks
      }
    }

    onRatingClicked(message:string) : void{
      this.pageTitle= 'Product list:' + message;
    }

    performFilter(filterBy:string): IProduct[]{
      filterBy= filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
       product.productName.toLocaleLowerCase().includes(filterBy));

    }



}