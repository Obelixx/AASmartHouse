import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserMetadataService } from '../services/usermetadata.service';


@Injectable()
export class ByUnauthenticatedUserGuard implements CanActivate {
  constructor(private user: UserMetadataService, private router: Router) { }

  canActivate(): boolean {
    if (!this.user.userIsLoggedIn) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
