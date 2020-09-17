import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gratitude',
  templateUrl: './gratitude.component.html',
  styleUrls: ['./gratitude.component.less']
})
export class GratitudeComponent implements OnInit {


  @Output() closeWindow: EventEmitter<any> = new EventEmitter<any>()
  @Input() done: boolean;

  constructor() { }

  ngOnInit() {
  }

  close(side) {
    this.closeWindow.emit(side);
    window.scrollTo(
      {
        top: 0,
        behavior: "auto"
      }
    );
    location.reload(true);
  }

}
