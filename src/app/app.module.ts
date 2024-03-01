import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GravtyBlocklyModule } from './gravty-blockly/gravty-blockly.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, GravtyBlocklyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
