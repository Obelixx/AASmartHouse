import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserService } from './services/user.service';

@NgModule({
  imports:[FormsModule],
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserDetailsComponent,
    ],
  providers: [UserService]
})
export class UserModule {

}