import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from './calculator/calculator.component';
import {environment} from '../environments/environment';

const routes: Routes = [
  { path: ':lang/calculator', component: CalculatorComponent },
  { path: '**', redirectTo: `${environment.defaultLanguage}/calculator`, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
