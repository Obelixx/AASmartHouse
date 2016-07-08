import { Component } from '@angular/core';
import { LoginComponent } from './components/login.component';
import './operators/rxjs-operators';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/localStorage.service';

@Component({
  	selector: 'my-app',
    template: `
        <h1>My First Angular 2 App</h1>
        <br>
        <login>Loading Login Component...</login>
        `,
    directives: [LoginComponent],
    providers: [UserService, LocalStorageService]
})
export class AppComponent {
    
}