import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Complects } from '../data';

@Component({
  selector: 'app-order-complect',
  templateUrl: './order-complect.component.html',
  styleUrls: ['./order-complect.component.less']
})
export class OrderComplectComponent implements OnInit {


  @Input() visibility: boolean;
  @Input() complect: number;
  slides = Complects;
  orderComplect: FormGroup;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.orderComplect = this.fb.group({
      phones: ['',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.maxLength(11)
        ]
      ],
    });
  }

  close(side) {
    this.visibleChanged.emit(side);
  }

}
