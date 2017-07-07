import { NgModule } from '@angular/core';

import { ByAuthenticatedUserGuard, ByUnauthenticatedUserGuard } from './guards/index';
import { DatabaseService } from './services/database.service';
import { UserMetadataService } from './services/usermetadata.service';

@NgModule({
  declarations: [
  ],
  providers: [
    DatabaseService,
    UserMetadataService,
  ]
})
export class SharedModule {

}