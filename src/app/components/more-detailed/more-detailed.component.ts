import { Component, OnInit, Input, Output } from '@angular/core';
import { Complects } from '../data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-more-detailed',
  templateUrl: './more-detailed.component.html',
  styleUrls: ['./more-detailed.component.less']
})
export class MoreDetailedComponent implements OnInit {

  @Input() visibility: boolean;
  @Input() complect: number;
  slides = Complects;
  orderComplect: FormGroup;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.complect)
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
