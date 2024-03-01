import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBlocklyComponent } from './ngx-blockly/ngx-blockly.component';

@NgModule({
  declarations: [NgxBlocklyComponent],
  imports: [CommonModule],
  exports: [NgxBlocklyComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class GravtyBlocklyModule {}
