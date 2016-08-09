import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../app.settings';

@Injectable()
export class ScreenService {
    private settings = AppSettings.ScreenServiceSettings;
    public addScreenEvent = new EventEmitter;

    addScreen(screen) {
        this.addScreenEvent.emit(screen);
    }
}