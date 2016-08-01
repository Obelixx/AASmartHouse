import { Component } from '@angular/core';
import '../operators/rxjs-operators';

import { NavBarComponent } from '../components/navBar.component';
import { ScreenComponent } from '../components/screen.component';
import { LoginScreenComponent } from './loginScreen.component';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/localStorage.service';
import { ScreenService } from '../services/screen.service'

@Component({
  	selector: 'my-app',
    templateUrl: './app/components/templates/app.component.template.html',
    directives: [NavBarComponent, ScreenComponent, LoginScreenComponent],
    providers: [UserService, LocalStorageService, ScreenService]
})
export class AppComponent {
    
}