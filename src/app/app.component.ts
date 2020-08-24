import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

  signUpForm: FormGroup;
  visible: boolean;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
    this.visible = false;
  }

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
          Validators.maxLength(11)
        ]
      ],
    });
  }

  getSelectedText(): string {
    return window.getSelection().toString();
  }

  checkKey(event: KeyboardEvent, maxLength = 999) {
    const pattern = /[0-9]/;
    if (
      this.getSelectedText().length &&
      (event.target as HTMLInputElement).value.includes(this.getSelectedText()) &&
      pattern.test(event.key)
    ) {
      return;
    }
    if ((!pattern.test(event.key) ||
      (event.target as HTMLInputElement).value.length > maxLength) &&
      !this.specialKey(event.keyCode)) {
      event.preventDefault();
    }
  }

  specialKey(key: number) {
    return (
      key === 8 || // check key backspace
      key === 9 || // check key TAB
      key === 46 || // check key delete
      key === 38 || // check key left
      key === 37 || // check key right
      key === 39 || // check key up
      key === 40 // check key down
    );
  }

  visibility() {
    this.visible = true;
  }


}