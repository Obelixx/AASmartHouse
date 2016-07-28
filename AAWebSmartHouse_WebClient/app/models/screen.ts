export class Screen {
    componentClass;
    componentElement;

    constructor(componentClass, componentElement) {
        this.componentClass = componentClass;
        this.componentElement = componentElement;
    }
}