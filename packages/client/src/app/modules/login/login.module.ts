import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  { path: '', component: LoginComponent }
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    RoutingConfig,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
