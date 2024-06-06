import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {AppRoutingTitles} from './app-routing.titles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit(): void {
    const appTitle = this.title.getTitle();
    this.router
      .events.pipe(filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;
        if (child?.snapshot.data.title) {
          return child.snapshot.data.title;
        }
        return appTitle;
      })
    ).subscribe((title: string) =>  {
      this.title.setTitle(`${AppRoutingTitles.APP} - ${title}`);
    });
  }
}
