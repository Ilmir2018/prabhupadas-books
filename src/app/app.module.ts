import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SliderComponent } from './components/slider/slider.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { MoreDetailedComponent } from './components/more-detailed/more-detailed.component';
import { OrderComplectComponent } from './components/order-complect/order-complect.component';
import { HttpClientModule }   from '@angular/common/http';
import { GratitudeComponent } from './components/gratitude/gratitude.component';
import { NameMaskDirective } from './name-mask.directive';
import { ConsultationComponent } from './components/consultation/consultation.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ContactsComponent,
    PhoneMaskDirective,
    NameMaskDirective,
    MoreDetailedComponent,
    OrderComplectComponent,
    GratitudeComponent,
    ConsultationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [PhoneMaskDirective, NameMaskDirective],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
