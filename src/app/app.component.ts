import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SliderComponent } from './components/slider/slider.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

  signUpForm: FormGroup;
  visible: boolean;
  clicks: number = 0;
  slideIndex: number = 1;

  @ViewChild(SliderComponent) viewChild: SliderComponent

  constructor(private fb: FormBuilder, private http: HttpClient) {

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

  get _checkbox() {
    return this.signUpForm.get('checkbox')
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

  //Текущий слайд
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
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

  //Функция скроллинга по странице
  scroll(multiplier) {
    window.scrollTo(
      {
        top: 1000 * multiplier,
        behavior: "smooth"
      }
    );
  }

  initForm(): void {
    this.signUpForm = this.fb.group({
      phones: ['',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.maxLength(21),
          Validators.minLength(16)
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
    const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Promise((res, rej) => {
      this.http.post
        ('http://localhost:3000/', { phone: this.signUpForm.get('phones').value, complect: 'Консультация' }, { headers: myHeaders })
        .subscribe(
          (val) => {
            console.log("POST call successful value returned in body",
              val);
          },
          response => {
            console.log("POST call in error", response);
          },
          () => {
            console.log("The POST observable is now completed.");

          });
      // location.reload(true);
    });

  }

  


}