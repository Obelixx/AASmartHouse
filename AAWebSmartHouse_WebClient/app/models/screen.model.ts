export class ScreenModel {
    componentClass;
    componentElement;

    constructor(componentClass, componentElement = null) {
        this.componentClass = componentClass;
        this.componentElement = componentElement;
    }
}