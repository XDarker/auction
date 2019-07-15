import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {


  // 装饰器
  @Input()
  private rating: number = 0;

  private stars: boolean[];

  @Input()
  private readOnly: boolean = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  clickStar(idnex: number) {
    if (!this.readOnly) {
      this.rating = idnex + 1;
      this.ngOnInit();
      this.ratingChange.emit(this.rating);
    }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

}
