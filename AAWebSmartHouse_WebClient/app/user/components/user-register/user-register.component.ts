import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-register',
  templateUrl: '/app/user/components/user-register/user-register.component.html'
})
export class UserRegisterComponent {
  constructor(private user: UserService) {
  }
}
