import { Component, DynamicComponentLoader, Injector, ElementRef, ViewContainerRef } from '@angular/core';
import { ScreenService } from '../services/screen.service'
import { LoginNavBarComponent } from './loginNavBar.component';
import { Screen } from '../models/screen';

@Component({
    selector: 'screen',
    providers: [],
    templateUrl: './app/components/templates/screen.component.template.html',
    directives: []
})
export class ScreenComponent {
    textField = 'initial text';
    public component: any;

    constructor(
        private screenService: ScreenService,
        public dcl: DynamicComponentLoader,
        public injector: Injector,
        public _elementRef: ElementRef,
        public _viewContainerRef: ViewContainerRef) {
            
            screenService.screens
    }


    addToScreenArray() {
        this.screenService.addScreen(new Screen(LoginNavBarComponent,null));


        this._viewContainerRef.clear();

        // this.screenService.screens.forEach(screen => {
        //     screen.componentElement = this.dcl.loadNextToLocation(screen.componentClass, this._viewContainerRef);
        // });

        let start = this.screenService.screens.length-1;
        for (var index = start; index >= 0; index--) {           
            let screen = this.screenService.screens[index];
            screen.componentElement = this.dcl.loadNextToLocation(screen.componentClass, this._viewContainerRef);
            //screen.componentElement = this.dcl.loadAsRoot(screen.componentClass, "#screensContainer", this.injector)
        }

    }
}