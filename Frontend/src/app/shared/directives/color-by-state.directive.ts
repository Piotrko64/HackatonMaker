import { Directive } from '@angular/core';
import { ElementRef, Input } from '@angular/core';
import { PopupState } from '../types/PopupState.enum';

const stateColors = [
  {
    state: PopupState.INFO,
    color: 'var(--orange)',
  },
  { state: PopupState.WARN, color: 'var(--red)' },
  { state: PopupState.OK, color: 'var(--green)' },
];

@Directive({
  selector: '[appColorByState]',
})
export class ColorByStateDirective {
  @Input() appColorByState: PopupState | null = PopupState.WARN;
  @Input() onlyBackground: boolean;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    const Element = this.el.nativeElement;

    Element.style[this.onlyBackground ? 'background' : 'color'] =
      stateColors.find(({ state }) => state === this.appColorByState)?.color ??
      'var(--red)';
  }
}
