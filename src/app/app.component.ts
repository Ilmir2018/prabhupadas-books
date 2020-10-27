import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SliderComponent } from './components/slider/slider.component';
import { SendMailService } from './services/send-mail.service';
import { ViewEncapsulation } from '@angular/core';
import { iconsContent } from '../app/components/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  signUpForm: FormGroup;
  icons = iconsContent;
  count = 0;
  visible: boolean;
  clicks: number = 0;
  slideIndex: number = 1;
  littleSlideIndex: number = 1;
  consultation: boolean = false;
  error: any;

  @ViewChild(SliderComponent) viewChild: SliderComponent

  constructor(private fb: FormBuilder, public httpService: SendMailService) {

  }

  ngOnInit() {
    this.initForm();
    this.visible = false;
  }

  ngAfterViewInit() {
    console.log(this.viewChild)
  }

  get _phones() {
    return this.signUpForm.get('phones')
  }

  get _name() {
    return this.signUpForm.get('name')
  }

  get _checkbox() {
    return this.signUpForm.get('checkbox')
  }

  changeImages(side: any) {
    if (side === false) {
      if (this.count > 0) {
        this.count--;
      } else if (this.count <= 0) {
        this.count = this.icons.length - 1;
      }
    } else {
      if(this.count < this.icons.length - 1) {
        this.count++;
      } else {
        this.count = 0;
      }
    }
  }


  /**
   * Функция для смены класса для кружочков, событие передаётся из дочернего класса app-slider
   * @param data true или false в зависимости от влево-вправо  
   */
  dataChangeHandler(data) {
    if (data === true) {
      this.showSlides(this.slideIndex += 1);
    } else {
      this.showSlides(this.slideIndex -= 1);
    }
  }

  changeLittleSlider(data) {
    if (data === 1) {
      this.showLittleSlides(this.littleSlideIndex += 1);
    } else {
      this.showLittleSlides(this.littleSlideIndex -= 1);
    }
    this.changeImages(data);
  }

  //Текущий слайд
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  littleSlide(n) {
    this.showLittleSlides(this.littleSlideIndex = n);
  }


  //Функция смены класса
  showSlides(n) {
    let i;
    let dots = document.getElementsByClassName("slide");
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

  //Функция смены класса
  showLittleSlides(n) {
    let i;
    let dots = document.getElementsByClassName("little_slide");
    if (n > dots.length) {
      this.littleSlideIndex = 1
    }
    if (n < 1) {
      this.littleSlideIndex = dots.length
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[this.littleSlideIndex - 1].className += " active";
  }

  //Функция скроллинга по странице
  scroll(elem) {
    document.getElementById(elem).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  initForm(): void {
    this.signUpForm = this.fb.group({
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

  getSelectedText(): string {
    return window.getSelection().toString();
  }

  visibility() {
    this.visible = true;
  }

  submit() {
    this.httpService.getConsultation('http://prabhupada-books.ru:3000',
      this.signUpForm.get('phones').value, this.signUpForm.get('name').value, 'Консультация');
      this.httpService.done = true;
  }

  dataClose(data) {
    if (data === true) {
      this.httpService.done = false;
    }
  }

  consult() {
    this.consultation = true;
  }

  consulting(data) {
    if (data === true) {
      this.consultation = false;
    }
  }

}