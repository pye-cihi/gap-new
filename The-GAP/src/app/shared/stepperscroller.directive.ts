import { Directive, HostListener } from '@angular/core';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Directive({
  selector: '[appMatVerticalStepperScroller]'
})
export class MatVerticalStepperScrollerDirective {
  constructor(private stepper: MatStepper) {}

  @HostListener('selectionChange', ['$event'])
  selectionChanged(selection: StepperSelectionEvent) {
    const stepId = this.stepper._getStepLabelId(selection.selectedIndex - 1);
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
      setTimeout(() => {
        stepElement.scrollIntoView({block: 'start'});
        // stepElement.scrollIntoView({behavior: 'auto', block: 'start', inline: 'nearest'});
      }, 100);
    }
  }
}
