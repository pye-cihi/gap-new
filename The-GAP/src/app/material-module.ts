import { NgModule } from '@angular/core';

import {
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule 
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
//   imports: [
//     MatStepperModule,
//     MatInputModule
//   ],
  exports: [
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
