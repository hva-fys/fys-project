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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { CheckoutComponent } from './checkout/checkout.component';
import { StateService } from './state.service';
import { MatIconModule } from '@angular/material';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  { path: '', component: ProductListComponent, data: { state: 'plp' } },
  { path: 'product/:id', component: ProductDetailsComponent, data: { state: 'pdp' } },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent }
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
    MatSnackBarModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    RoutingConfig
  ],
  declarations: [ProductListComponent, ProductDetailsComponent, CheckoutComponent, PaymentComponent],
  providers: [StateService]
})
export class WebshopModule { }
