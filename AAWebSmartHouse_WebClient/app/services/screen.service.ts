import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { ScreenModel } from '../models/screen.model';

@Injectable()
export class ScreenService {
    private settings = AppSettings.ScreenServiceSettings;
    public screensChangeEvent = new EventEmitter;
    private screens: ScreenModel[] = [];

    allScreens(): ScreenModel[] {
        return this.screens.slice();
    }

    addScreen(screeen: ScreenModel): ScreenModel {
        this.screens.push(screeen);
        while (this.screens.length > this.settings.numberOfScreensToKeep) {
            this.screens.shift();
        }

        this.screensChangeEvent.emit({value: this.allScreens()})

        return this.screens[this.screens.length - 1];
    }
}