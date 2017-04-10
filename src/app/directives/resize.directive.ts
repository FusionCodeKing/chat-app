import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[resize]'
})

export class ResizeDirective {
  private startDrag: boolean = false;
  private x: number;
  private minWidth: number = 150;
  private maxWidth: number = 500;
  @Input('resize') width: number;
  @Output() changeWidth: EventEmitter<any> = new EventEmitter(false);
  @Output() saveWidth: EventEmitter<any> = new EventEmitter(false);

  @HostListener('mousedown', ['$event']) onMouseDown(e) {
    this.startDrag = true;
    this.x = e.pageX;
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(e) {
    if (this.startDrag) {
      let dx = e.pageX - this.x;
      if ((this.width + dx) > this.minWidth && (this.width + dx) < this.maxWidth) {
        this.width += dx;
        this.x = e.pageX;
        this.changeWidth.emit(this.width);
      }
    }
  }

  @HostListener('document:mouseup') onMouseUp() {
    this.startDrag = false;
    this.saveWidth.emit(this.width);
  }
}