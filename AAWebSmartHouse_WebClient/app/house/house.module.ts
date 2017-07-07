import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';
import { HouseService } from './services/house.service';
import { HouseListComponent } from './components/house-list/house-list.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
  ],
  declarations: [
    HouseListComponent,
  ],
  providers: [
    HouseService
  ]
})
export class HouseModule {

}