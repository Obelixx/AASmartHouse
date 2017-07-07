import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-details',
  templateUrl: '/app/user/components/user-details/user-details.component.html'
})
export class UserDetailsComponent {
  constructor(private service: UserService) {
  }
}
