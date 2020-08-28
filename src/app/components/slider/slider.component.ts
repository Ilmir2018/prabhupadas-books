import { Component, OnInit } from '@angular/core';
import { Slider } from '../slider.object';
import { Slides } from '../data';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

  slides: Slider[] = Slides;
  count = 0;
  constructor() { }

  ngOnInit() {
  }

  changeImages(side) {
    if (side == 0) {
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
  }

}
