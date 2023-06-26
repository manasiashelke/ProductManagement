import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpaces } from '../shared/convertto-spaces';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpaces,
  
    ProductDetailComponent,
  ],
  imports: [
   
    RouterModule.forChild([
      {path: 'products', component:ProductListComponent},
      {path: 'product/:id',
      canActivate: [ProductDetailGuard],
      component:ProductDetailComponent},
    ]),
    SharedModule
  ]
})
export class ProductModule { }
