import {Component, Input} from '@angular/core';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.sass']
})
export class UserAvatarComponent {

  @Input()
  color: 'light' | 'dark' = 'light';

  @Input()
  size: SizeProp = '2x';
  constructor() { }

}
