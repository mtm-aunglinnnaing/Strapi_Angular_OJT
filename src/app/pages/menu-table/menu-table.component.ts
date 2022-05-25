import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/repositories/master.service';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit {

  public menuLists: any;
  public columnSettings: any;
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private masterSvc: MasterService,
  ) { }

  ngOnInit(): void {
    this.getMenuList();
    this.columnSettings = [
      {
        primaryKey: 'name',
        header: 'Name',
        format: 'string',
        sticky: true,
      },
      {
        primaryKey: 'pirce',
        header: 'Price',
        format: 'currency'
      },
      {
        primaryKey: 'attached_image',
        header: 'Image',
        format: 'image'
      },
      {
        primaryKey: 'description',
        header: 'Description',
        format: 'string'
      },
      {
        primaryKey: 'reference_url',
        header: 'Reference URL',
        format: 'link'
      },
      {
        primaryKey: 'created_at',
        header: 'Created_At',
        format: 'date'
      }
    ];
  }

  async getMenuList() {
    this.menuLists = await this.masterSvc.getMenu();
    console.log('menu list;;;', this.menuLists);
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.menuLists.length
    };
  }

  paginateFunc(event: any) {
    this.config.currentPage = event;
  }
}
