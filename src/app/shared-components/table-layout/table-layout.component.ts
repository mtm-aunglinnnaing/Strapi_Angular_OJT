import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {

  @Input() caption = '';
  @Input() keys: any;
  @Input() records: any;
  @Input() config: any;
  @Input() styleExpression: any;
  @Output() paginateFunc: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('keys & records', this.keys, this.config)
  }

  public pageChanged(event: any) {
    console.log('event child;', event)
    this.paginateFunc.emit(event);
  }

  public goLink(link: any) {
    console.log('link child;', link)
    // this.paginateFunc.emit(link);
  }
}
