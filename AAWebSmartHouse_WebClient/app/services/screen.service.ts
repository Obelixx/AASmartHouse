import { Injectable }     from '@angular/core';
import { Component } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { Screen } from '../models/screen';

@Injectable()
export class ScreenService {
    settings = AppSettings.ScreenServiceSettings;
    screens : Screen[] = [];

    // constructor(things: [any]) {
    //     things.forEach(element => {
    //         this.screens.push(element);
    //     });
    // }

    addScreen(screeen: Screen) {
        this.screens.push(screeen);
        while (this.screens.length > this.settings.numberOfScreensToKeep) {
            this.screens.shift();
        }
        return this.screens[this.screens.length-1];
    }
}