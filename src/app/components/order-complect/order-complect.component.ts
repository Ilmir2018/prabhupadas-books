import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Complects } from '../data';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-order-complect',
  templateUrl: './order-complect.component.html',
  styleUrls: ['./order-complect.component.less']
})
export class OrderComplectComponent implements OnInit {


  @Input() visibility: boolean;
  @Input() complect: number;
  slides = Complects;
  visible: boolean = false;
  orderComplect: FormGroup;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter<any>()
  private done: boolean = false;

  constructor(private fb: FormBuilder, private httpService: SendMailService) { }

  ngOnInit() {
    this.initForm();
  }

  get _phones() {
    return this.orderComplect.get('phones')
  }

  get _name() {
    return this.orderComplect.get('name')
  }

  get _checkbox() {
    return this.orderComplect.get('checkbox')
  }

  initForm(): void {
    this.orderComplect = this.fb.group({
      phones: ['',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.maxLength(20),
          Validators.minLength(16)
        ]
      ],
      name: ['',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(5)
        ]
      ],
      checkbox: ['',
        [
          Validators.required,
        ]]
    });
  }

  close(side) {
    this.visibleChanged.emit(side);
  }

  submit(complect) {
    this.httpService.getConsultation('http://prabhupada-books.ru:3000',
      this.orderComplect.get('phones').value, this.orderComplect.get('name').value,
       `Номер комплекта: ${complect + 1}`);
       setTimeout(() => {
        this.close(true);
        this.httpService.done = true;
      }, 2000);
  }

  dataClose(data) {
    if (data === true) {
      this.httpService.moreDetailed = false;
    }
  }

  dataChangeHandler(data) {
    if (data === true) {
      this.httpService.orderComplect = false;
    }
  }

}
