import { Component, OnInit, Input, Output } from '@angular/core';
import { Complects } from '../data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { SendMailService } from 'src/app/services/send-mail.service';

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

  constructor(private fb: FormBuilder, private httpService: SendMailService) { }

  ngOnInit() {
    console.log(this.complect)
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
      this.httpService.done = false;
    }
  }

  dataChangeHandler(data) {
    if (data === true) {
      this.httpService.moreDetailed = false;
    }
  }


}
