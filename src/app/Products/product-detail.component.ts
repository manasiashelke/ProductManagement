import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent  {
pageTitle:string='Product Detail';
products: IProduct | undefined;
  errorMessage: any;
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {
}

ngOnInit(): void{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.pageTitle += `: ${id}`;
  this.getProduct(id);
}

getProduct(id: number): void {
  this.productService.getProduct(id).subscribe({
    next: (products: IProduct | undefined) => this.products = products,
    error: (err: any) => this.errorMessage = err
  });
}

onBack(): void {
  this.router.navigate(['/products']);
}
}
