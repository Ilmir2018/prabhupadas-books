import { Component, OnInit, Output } from '@angular/core';
import { Slider } from '../slider.object';
import { Slides } from '../data';
import { EventEmitter } from '@angular/core';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

  slides: Slider[] = Slides;
  count = 0;
  visible: boolean = true;
  slide: number = 1;
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(public httpService: SendMailService) { }

  ngOnInit() {
  }

  changeImages(side: any) {
    if (side === false) {
      if (this.count > 0) {
        this.count--;
      } else if (this.count <= 0) {
        this.count = this.slides.length - 1;
      }
    } else {
      if(this.count < this.slides.length - 1) {
        this.count++;
      } else {
        this.count = 0;
      }
    }
    //Передача события в родительский класс.
    this.dataChanged.emit(side)
  }

  detailed(slide: number) {
    this.httpService.moreDetailed = true;
    this.slide = slide;
  }

  orderVisible(slide: number) {
    this.httpService.orderComplect = true;
    this.slide = slide;
  }

  dataChangeHandler(data) {
    if (data === true) {
      this.httpService.moreDetailed = false;
    }
  }
  
  orderCloseHandler(data) {
    if (data === true) {
      this.httpService.orderComplect = false;
    }
  }
}
