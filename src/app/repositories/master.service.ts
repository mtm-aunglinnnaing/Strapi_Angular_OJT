import { Injectable } from '@angular/core';
import { ApiService } from '../drivers/api.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private apiSvc: ApiService) { }

  async getCustomer(): Promise<object> {
    return await this.apiSvc.get(`customers`);
  }

  async postImage(body: any): Promise<object> {
    return await this.apiSvc.post(`upload`, body);
  }

  async uploadImage(body: any): Promise<object> {
    return await this.apiSvc.post(`images`, body);
  }

  async getMenu(): Promise<object> {
    return await this.apiSvc.get(`menus`);
  }

  async getCategoryDetail(name: any): Promise<object> {
    return await this.apiSvc.getCategory(`categories/?name=${name}`);
  }

  async updateMenu(body: any, id: any): Promise<object> {
    return await this.apiSvc.put(`menus/${id}`, body);
  }

  async getRestaurant(): Promise<object> {
    return await this.apiSvc.get(`restaurants`);
  }
  async getBestSeller(date: any): Promise<object> {
    return await this.apiSvc.get(`restaurants/bestmenu/${date}`);
  }

  async getBestBuying(): Promise<object> {
    return await this.apiSvc.get(`orders/mostorder`);
  }

  async getBestMenu(id: any): Promise<object> {
    return await this.apiSvc.get(`menus/${id}`);
  }

  async getMostOrder(id: any): Promise<object> {
    return await this.apiSvc.get(`customers/${id}`);
  }
}
