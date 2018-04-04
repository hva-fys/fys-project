import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';


const routes: Routes = [
  { path: '', component: ProductListComponent, data: { state: 'plp' } },
  { path: 'product', component: ProductDetailsComponent, data: { state: 'pdp' } }
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    RoutingConfig
  ],
  declarations: [ProductListComponent, ProductDetailsComponent]
})
export class WebshopModule { }
