import { Component, DynamicComponentLoader, Injector, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { ScreenModel } from '../models/screen.model';

import { NavBarComponent } from './navBar.component';

import { ScreenService } from '../services/screen.service'

import { AppSettings } from '../app.settings';


@Component({
    selector: 'screen',
    providers: [],
    templateUrl: './app/components/templates/screen.component.template.html',
    directives: []
})
export class ScreenComponent {
    @ViewChild('screensContainer0', { read: ViewContainerRef }) screensContainer: ViewContainerRef;
    //@ViewChild('screensContainer') screensContainer: ViewContainerRef;
    textField = 'initial text';

    constructor(
        private screenService: ScreenService,
        public dcl: DynamicComponentLoader,
        public injector: Injector
    ) {
        screenService.screensChangeEvent.subscribe(
            () => {
                this.renderScreens();
            });
    }

    getArrayWithMaxScreensLength(){
        return new Array(AppSettings.ScreenServiceSettings.numberOfScreensToKeep);
    }

    addToScreenArray() {
        this.screenService.addScreen(new ScreenModel(NavBarComponent));
    }

    renderScreens() {
        let screens = this.screenService.allScreens();
        this.screensContainer.clear();

        for (var index = (screens.length - 1); index >= 0; index--) {
            let screen = screens[index];
            screen.componentElement = this.dcl.loadNextToLocation(screen.componentClass, this.screensContainer);
            //screen.componentElement = this.dcl.loadAsRoot(screen.componentClass, "#screensContainer" + (screens.length - 1 - index), this.injector)
        }
    }
}