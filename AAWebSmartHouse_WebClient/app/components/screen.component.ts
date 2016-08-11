import { Component, ViewContainerRef, ViewChild, ComponentResolver } from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { LoginScreenComponent } from './screens/loginScreen.component';

import { ScreenService } from '../services/screen.service'

import { AppSettings } from '../app.settings';


@Component({
    selector: 'screen',
    providers: [],
    templateUrl: './app/components/templates/screen.component.template.html',
    directives: []
})
export class ScreenComponent {
    @ViewChild('screenContainer', { read: ViewContainerRef }) screenContainer: ViewContainerRef;

    constructor(
        private screenService: ScreenService,
        public componentResolver: ComponentResolver
    ) {
        screenService.addScreenEvent.subscribe(
            (screen) => {
                this.renderScreen(screen);
            });
    }

    getArrayWithMaxScreensLength() {
        return new Array(AppSettings.ScreenServiceSettings.numberOfScreensToKeep);
    }

    // todo: we don't need this!
    addToScreenArray() {
        this.screenService.toScreen(LoginScreenComponent);
    }

    private renderScreen(screen) {
        this.screenContainer.clear();
        this.componentResolver.resolveComponent(screen)
            .then((factory) => {
                this.screenContainer.createComponent(factory);
            });
    }
}