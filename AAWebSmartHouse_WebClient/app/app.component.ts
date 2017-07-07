import { Component } from '@angular/core';
import { UserService } from './user/services/user.service';
import { UserMetadataService } from './shared/services/usermetadata.service';

import './shared/operators/rxjs-operators';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
})
export class AppComponent {
  constructor(private user: UserService, private userMeta: UserMetadataService) {
  }
}
