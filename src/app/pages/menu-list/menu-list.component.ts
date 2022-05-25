import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MasterService } from 'src/app/repositories/master.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  public cake: any;
  public drink: any;
  public food: any;
  public myanmarCurry: any;
  public pizza: any;
  public menuList: any;
  public cakeDetail: any;
  public drinkDetail: any;
  public foodDetail: any;
  public myanmarCurryDetail: any;
  public pizzaDetail: any;
  constructor(
    private masterSvc: MasterService,
  ) { }

  ngOnInit(): void {
    this.getMenuList();
  }

  async getMenuList() {
    this.menuList = await this.masterSvc.getMenu();
    this.cake = this.menuList.filter((item: any) => {
      return item.category?.name === 'cake';
    });
    this.cake.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1)
    this.drink = this.menuList.filter((item: any) => {
      return item.category?.name === 'drink';
    });
    this.drink.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1)
    this.food = this.menuList.filter((item: any) => {
      return item.category?.name === 'food';
    });
    this.food.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1)
    this.myanmarCurry = this.menuList.filter((item: any) => {
      return item.category?.name === "myanmar's curry";
    });
    this.myanmarCurry.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1)
    this.pizza = this.menuList.filter((item: any) => {
      return item.category?.name === 'pizza';
    });
    this.pizza.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1)
    console.log('cake drink food;', this.cake, this.drink, this.food)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.applySortedChange();
  }

  /**
   * apply order sorted.
   */
  async applySortedChange() {
    console.log('cake detail;;', this.cake, this.food, this.drink, this.myanmarCurry, this.pizza)
    if (this.cake.length > 0) {
      let res = await this.masterSvc.getCategoryDetail('cake')
      this.cakeDetail = [res];
      console.log('cake detail;;', this.cakeDetail)
      this.cake.map(async (item: any, index: any) => {
        let orderkey = index + 1;
        const params = { ...item, category: this.cakeDetail[0][0].id, order_key: orderkey }
        await this.masterSvc.updateMenu(params, item.id)
      })
    }
    if (this.drink.length > 0) {
      let res = await this.masterSvc.getCategoryDetail('drink')
      this.drinkDetail = [res];
      this.drink.map(async (item: any, index: any) => {
        let orderkey = index + 1;
        const params = { ...item, category: this.drinkDetail[0][0].id, order_key: orderkey }
        await this.masterSvc.updateMenu(params, item.id)
      })
    }
    if (this.food.length > 0) {
      let res = await this.masterSvc.getCategoryDetail('food')
      this.foodDetail = [res];
      this.food.map(async (item: any, index: any) => {
        let orderkey = index + 1;
        const params = { ...item, category: this.foodDetail[0][0].id, order_key: orderkey }
        await this.masterSvc.updateMenu(params, item.id)
      })
    }
    if (this.myanmarCurry.length > 0) {
      let res = await this.masterSvc.getCategoryDetail("myanmar's curry")
      this.myanmarCurryDetail = [res];
      this.myanmarCurry.map(async (item: any, index: any) => {
        let orderkey = index + 1;
        const params = { ...item, category: this.myanmarCurryDetail[0][0].id, order_key: orderkey }
        await this.masterSvc.updateMenu(params, item.id)
      })
    }
    if (this.pizza.length > 0) {
      let res = await this.masterSvc.getCategoryDetail('pizza')
      this.pizzaDetail = [res];
      this.pizza.map(async (item: any, index: any) => {
        let orderkey = index + 1;
        const params = { ...item, category: this.pizzaDetail[0][0].id, order_key: orderkey }
        await this.masterSvc.updateMenu(params, item.id)
      })
    }
  }
}
