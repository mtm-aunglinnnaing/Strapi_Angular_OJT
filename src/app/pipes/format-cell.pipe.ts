import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'formatCell'
})
export class FormatCellPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private sanitize: DomSanitizer,
  ) { }

  transform(value: any, format: any) {
    // console.log('format;;', format)
    if (value === undefined) {
      return 'not available';
    }
    if (format === 'string') {
      return value;
    }
    if (format === 'dish') {
      return value > 1 ? value + 'dishes' : value + 'dish';
    }
    if (format === 'currency') {
      return this.currencyPipe.transform(value, 'USD', true);
    }
    if (format === 'date') {
      return this.datePipe.transform(value, 'longDate');
    }
    if (format === 'image') {
      let stylizedImage: string = '';
      const src = `${environment.apiUrl}${value.url}`
      // const src = 'http://localhost:1337' + value.url;
      if (value) {
        stylizedImage += `<img src="${src}"/> `;
        console.log('stylizedImage;', src)
        return stylizedImage;
      }
      return stylizedImage;
    }
    if (format === 'link') {
      let stylizedLink: string = '';
      if (value) {
        stylizedLink += `<a href="${value}">${value}</a> `;
        console.log('stylizedLink;', stylizedLink)
        return stylizedLink;
      }
      return stylizedLink;
    }

    return value;
  }
}
