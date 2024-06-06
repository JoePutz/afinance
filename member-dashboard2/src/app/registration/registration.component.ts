import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  visited = false;

  ngOnInit(): void {
    this.visited = (localStorage.getItem('visited') === 'true');
    if (!this.visited) {
      localStorage.setItem('visited', 'true');
      this.visited = true;
    }
  }

}
