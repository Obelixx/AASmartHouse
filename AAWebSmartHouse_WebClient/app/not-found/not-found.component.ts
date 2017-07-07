import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: '/app/not-found/not-found.component.html'
})
export class NotFoundComponent {
  notFoundImageUrl: string = '/assets/img/not-found.png';
}
