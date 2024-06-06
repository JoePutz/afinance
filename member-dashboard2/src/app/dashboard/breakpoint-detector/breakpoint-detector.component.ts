import {AfterViewInit, Component, HostListener} from '@angular/core';
import {BreakpointService} from '@dashboard/breakpoint-detector/breakpoint.service';
import {ScreenSize} from '@dashboard/breakpoint-detector/screen-size';

@Component({
  template: '',
  selector: 'app-breakpoint-detector'
})
export class BreakpointDetectorComponent implements AfterViewInit {

  constructor(private service: BreakpointService) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width < 576) {
      this.service.onResize(ScreenSize.XS);
    } else if (width < 768) {
      this.service.onResize(ScreenSize.SM);
    } else if (width < 992) {
      this.service.onResize(ScreenSize.MD);
    } else if (width < 1200) {
      this.service.onResize(ScreenSize.LG);
    } else if (width < 1400) {
      this.service.onResize(ScreenSize.XL);
    } else {
      this.service.onResize(ScreenSize.XXL);
    }
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

}
