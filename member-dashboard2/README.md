# AlineMemberDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Getting up and Running

- Run `rm -rf node_modules package-lock.json` to get rid of any bad packages.

- Install angular cli 12.1.4 so it aligns with the version used for the code.
`npm install @angular/cli@12.1.4` in the repo or `npm install -g @angular/cli@12.1.4` to install it globally on your pc.

- Next you need to run `npm install` to get all of the packages installed.

- To get the environment variables setup you have to go into src folder, environments, and edit the environment.tf file.

`api` is going to be `'http://localhost:8080/api'` include quotes.
`landingPortal` is going to be `'http://localhost:3007'` include quotes.

- `ng serve` will get a dev server up and running.