import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendMailService } from 'src/app/services/send-mail.service';
import { Complects } from '../data';

@Component({
  selector: 'app-order-complect-mobile',
  templateUrl: './order-complect-mobile.component.html',
  styleUrls: ['./order-complect-mobile.component.less']
})
export class OrderComplectMobileComponent implements OnInit {


  @Input() complect: number;
  @Input() visibility: boolean;
  visible: boolean = false;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter<any>()
  slides = Complects;
  orderComplect: FormGroup;

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

  submit(complect) {
    this.httpService.getConsultation('http://prabhupada-books.ru:3000',
      this.orderComplect.get('phones').value, this.orderComplect.get('name').value,
       `Номер комплекта: ${complect + 1}`);
       setTimeout(() => {
        this.close(true);
        this.httpService.done = true;
      }, 2000);
  }

  close(side) {
    this.visibleChanged.emit(side);
  }

}
