import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/repositories/master.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from "axios";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    // toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  customerList: any;
  restaurantList: any;
  menuList: any;
  file: any;
  public imageData = "data:image/png;base64,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"
  constructor(
    private masterSvc: MasterService,
    private http: HttpClient,
  ) { }

  public orderForm = new FormGroup({
    customer: new FormControl(''),
    menu: new FormControl(''),
    restaurant: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllMasterData();
  }

  async getAllMasterData() {
    const [customer, menu, restaurant] = await Promise.all([
      this.masterSvc.getCustomer(),
      this.masterSvc.getMenu(),
      this.masterSvc.getRestaurant()
    ]);
    this.customerList = customer;
    this.menuList = menu;
    this.restaurantList = restaurant;
  }

  // On file Select
  async onChangeFileInput(event: any) {
    this.file = event.target.files[0];
  }


  async submitTextEditor() {
    const contentType = this.base64Mime(this.htmlContent);
    const b64Data = this.htmlContent.substring(
      this.htmlContent.indexOf('"') + 1,
      this.htmlContent.lastIndexOf('"')
    );
    const imageData = b64Data
    // const imagedata = "data:image/png;base64,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"
    const imageType = String(contentType).substring(6);
    fetch(imageData)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `upload_image.${imageType}`, { type: String(contentType) })
        const formData = new FormData()

        formData.append('files', file)
        axios.post("http://localhost:1337/upload", formData)
          .then((response: any) => {
            //after success
            const params = {
              image_url: `http://localhost:1337${response.data[0].url}`,
            }
            console.log('res', response.data[0].url, params)
            this.masterSvc.uploadImage(params)
          }).catch((error: any) => {
            //handle error
            console.error('Image Upload Failed!')
          })
      })
  }

  base64Mime(encoded: any) {
    let result = null;
    if (typeof encoded !== 'string') {
      return result;
    }

    let mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  }


  onSubmit() {

  }
}
