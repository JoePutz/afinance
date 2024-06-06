import {NgModule} from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faArrowLeft,
  faArrowRight,
  faBars,
  faCaretDown,
  faCaretUp,
  faChartBar,
  faCheckCircle,
  faCircle,
  faEllipsisH,
  faEllipsisV,
  faExchangeAlt,
  faExclamationCircle,
  faEye,
  faEyeSlash,
  faIdCard,
  faInfoCircle,
  faSearch,
  faShieldAlt,
  faSyncAlt,
  faTags,
  faTimesCircle,
  faUnlockAlt,
  faUser,
  faUserCheck,
  faUserCircle,
  faUserPlus,
  faWallet,
  faEdit, faSave, faTimes
} from '@fortawesome/free-solid-svg-icons';
import {faCircle as regCircle} from '@fortawesome/free-regular-svg-icons';

const icons: IconDefinition[] = [
  faAngleRight,
  faUserCheck,
  faUserPlus,
  faInfoCircle,
  faShieldAlt,
  faExclamationCircle,
  faCheckCircle,
  faTimesCircle,
  faUnlockAlt,
  regCircle,
  faBars,
  faChartBar,
  faWallet,
  faTags,
  faUserCircle,
  faArrowRight,
  faIdCard,
  faCircle,
  faUser,
  faAngleRight,
  faEllipsisV,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp,
  faSearch,
  faSyncAlt,
  faEllipsisH,
  faExchangeAlt,
  faEdit,
  faSave,
  faTimes
];

@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class AppIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...icons);
  }
}
