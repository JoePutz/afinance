import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ScreenSize} from '@dashboard/breakpoint-detector/screen-size';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private resizeSubject: Subject<ScreenSize>;

  constructor() {
    this.resizeSubject = new Subject<ScreenSize>();
  }

  get onResize$(): Observable<ScreenSize> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  onResize(size: ScreenSize) {
    this.resizeSubject.next(size);
  }

}
