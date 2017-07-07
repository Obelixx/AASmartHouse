import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';
import { RoomService } from './services/room.service';
import { RoomListComponent } from './components/room-list/room-list.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
  ],
  declarations: [
    RoomListComponent,
  ],
  providers: [
    RoomService
  ]
})
export class RoomModule {

}