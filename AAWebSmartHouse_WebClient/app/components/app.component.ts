import { Component } from '@angular/core';
import { LoginNavBarComponent } from '../components/loginNavBar.component';
import { ScreenComponent } from '../components/screen.component';
import '../operators/rxjs-operators';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/localStorage.service';
import { ScreenService } from '../services/screen.service'

@Component({
  	selector: 'my-app',
    templateUrl: './app/components/templates/app.component.template.html',
    directives: [LoginNavBarComponent, ScreenComponent ],
    providers: [UserService, LocalStorageService, ScreenService]
})
export class AppComponent {
    
}