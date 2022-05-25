import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { SummaryRestaurantComponent } from './pages/summary-restaurant/summary-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableLayoutComponent } from './shared-components/table-layout/table-layout.component';
import { FormatCellPipe } from './pipes/format-cell.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import { MenuTableComponent } from './pages/menu-table/menu-table.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    OrderCreateComponent,
    MenuListComponent,
    SummaryRestaurantComponent,
    TableLayoutComponent,
    FormatCellPipe,
    MenuTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DragDropModule,
    MatCardModule,
    CKEditorModule,
    AngularEditorModule,
  ],
  providers: [CurrencyPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
