import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { MenuTableComponent } from './pages/menu-table/menu-table.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { SummaryRestaurantComponent } from './pages/summary-restaurant/summary-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: MenuListComponent,
  },
  {
    path: 'summary/list',
    component: SummaryRestaurantComponent,
  },
  {
    path: 'menu/list',
    component: MenuTableComponent,
  },
  {
    path: 'image/upload',
    component: OrderCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
