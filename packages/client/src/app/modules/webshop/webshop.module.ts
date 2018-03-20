import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductListComponent, ProductDetailsComponent]
})
export class WebshopModule { }
