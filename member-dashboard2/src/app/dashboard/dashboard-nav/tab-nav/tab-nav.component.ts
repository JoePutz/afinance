import {Component, Input} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
/**
 * Tab type to construct a NavTabComponent.
 */
export type Tab = {
  icon: IconProp;
  label: string;
  route: string;
};

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.sass']
})
export class TabNavComponent {

  @Input()
  tabs!: Tab[];

  constructor() { }



}
