import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/repositories/master.service';

@Component({
  selector: 'app-summary-restaurant',
  templateUrl: './summary-restaurant.component.html',
  styleUrls: ['./summary-restaurant.component.scss']
})
export class SummaryRestaurantComponent implements OnInit {

  public restaurantData: any = [];
  public restaurantList: any;
  public dateFilter: any;
  public dateRange: any;
  public bestMenu: any;
  public mostOrder: any;
  public columnSettings: any;
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private masterSvc: MasterService,
  ) { }

  public orderForm = new FormGroup({
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllMasterData();
    this.dateFilter = [
      {
        label: 'Last Week',
        value: 'lastWeek'
      },
      {
        label: 'Last Month',
        value: 'lastMonth'
      },
      {
        label: 'Last Year',
        value: 'lastYear'
      }
    ];

    this.columnSettings = [
      {
        primaryKey: 'name',
        header: 'Restaurant Name',
        format: 'string'
      },
      {
        primaryKey: 'bestMenu',
        header: 'Best Menu',
        format: 'string'
      },
      {
        primaryKey: 'mostOrder',
        header: 'Most Order',
        format: 'string'
      },
      {
        primaryKey: 'totalOrder',
        header: 'Total Order',
        format: 'dish'
      },
      {
        primaryKey: 'price',
        header: 'Menu Price',
        format: 'currency'
      },
      {
        primaryKey: 'user_registered',
        header: 'User Registerd_At',
        format: 'date'
      }
    ];
  }

  async getAllMasterData() {
  }


  async searchSummary() {
    const res = await this.masterSvc.getBestSeller(this.orderForm.value.date);
    this.restaurantList = res;
    let listData: any = [];
    this.restaurantList.map(async (el: any, index: any) => {
      const [bestMenu, mostOrder] = await Promise.all([
        this.getBestMenu(el.bestMenuId),
        this.getMostOrder(el.mostOrderId)
      ]);
      const data = { bestMenu: bestMenu?.name, mostOrder: mostOrder?.name, user_registered: mostOrder?.created_at, price: bestMenu?.pirce }
      const o = { ...el, ...data }
      listData.push(o);
      this.restaurantData = listData;
      this.restaurantData.sort((a: any, b: any) => a.id < b.id ? 1 : -1)
      console.log('this.restaurantData', this.restaurantData);

      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.restaurantData.length
      };
    })
  }

  async getBestMenu(id: any) {
    if (id) {
      const res = await this.masterSvc.getBestMenu(id);
      this.bestMenu = res;
      return this.bestMenu;
    }
  }

  async getMostOrder(id: any) {
    if (id) {
      const res = await this.masterSvc.getMostOrder(id);
      this.mostOrder = res;
      return this.mostOrder;
    }
  }

  paginateFunc(event: any) {
    this.config.currentPage = event;
  }
}
