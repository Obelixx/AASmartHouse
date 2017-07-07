import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-login',
  templateUrl: '/app/user/components/user-login/user-login.component.html'
})
export class UserLoginComponent {
  constructor(private user: UserService) {
  }
}
