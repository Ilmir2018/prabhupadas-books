import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.less']
})
export class ConsultationComponent implements OnInit {

  @Input() visibility: boolean;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter<any>()
  getConsulting: FormGroup;

  constructor(private fb: FormBuilder, private httpService: SendMailService) { }

  ngOnInit() {
    this.initForm();
  }

  get _phones() {
    return this.getConsulting.get('phones')
  }

  get _name() {
    return this.getConsulting.get('name')
  }

  get _checkbox() {
    return this.getConsulting.get('checkbox')
  }

  close(side) {
    this.visibleChanged.emit(side);
  }

  initForm(): void {
    this.getConsulting = this.fb.group({
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

  submit() {
    this.httpService.getConsultation('http://prabhupada-books.ru:3000',
      this.getConsulting.get('phones').value, this.getConsulting.get('name').value,
      `Консультация`);
    setTimeout(() => {
      this.close(true);
      this.httpService.done = true;
    }, 2000);
  }

  

}
