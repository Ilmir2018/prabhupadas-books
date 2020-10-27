import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Complects, MobileData } from '../data';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-more-detailed-mobile',
  templateUrl: './more-detailed-mobile.component.html',
  styleUrls: ['./more-detailed-mobile.component.less']
})
export class MoreDetailedMobileComponent implements OnInit {

  @Input() complect: number;
  @Input() visibility: boolean;
  slides = Complects;
  mobSlides = MobileData;
  slideIndex: number = 1;
  orderComplect: FormGroup;
  currentSlide = 0;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter<any>()

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

  changeSlide(side: any) {
    if (side === false) {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else if (this.currentSlide <= 0) {
        this.currentSlide = this.mobSlides[this.complect].complect.length - 1;
      }
      this.showSlides2(this.slideIndex -= 1);
    } else {
      if(this.currentSlide < this.mobSlides[this.complect].complect.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
      this.showSlides2(this.slideIndex += 1);
    }
  }

  //Функция смены класса
  showSlides2(n) {
    let i;
    let dots = document.getElementsByClassName("mob-slide");
    if (n > dots.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = dots.length
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[this.slideIndex - 1].className += " active";
  }

   //Текущий слайд
   currentSlideF(n) {
    this.showSlides2(this.slideIndex = n);
  }

}
