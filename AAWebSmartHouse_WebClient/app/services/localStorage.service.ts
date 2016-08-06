import { Injectable }     from '@angular/core';

@Injectable()
export class LocalStorageService {
    private localStorageKeyItem = 'AAWebSmartHouseWebClient';
    private storageObject = {};

    constructor() {
        this.updateObjectFromLocalStorage();
        this.updateLocalStorageFromObject();
    }

    setItem(item: string, value: string) {
        this.updateObjectFromLocalStorage();
        this.storageObject[item] = value;
        this.updateLocalStorageFromObject();
    }

    getItem(item: string) {
        this.updateObjectFromLocalStorage();
        return this.storageObject[item];
    }

    hasItem(item: string): boolean {
        this.updateObjectFromLocalStorage();
        return this.storageObject.hasOwnProperty(item);
    }

    clearItem(item: string){
        this.updateObjectFromLocalStorage();
        delete this.storageObject[item];
        this.updateLocalStorageFromObject();
    }

    clearAll(){
        this.clearLocalStorage();
    }

    private updateObjectFromLocalStorage() {
        let localStorageAsObject = JSON.parse(localStorage.getItem(this.localStorageKeyItem));    
        if (localStorageAsObject !== null) {
            this.storageObject = localStorageAsObject;
        }
    }

    private updateLocalStorageFromObject() {
        localStorage.setItem(this.localStorageKeyItem, JSON.stringify(this.storageObject));
    }

    private clearLocalStorage() {
        localStorage.removeItem(this.localStorageKeyItem);
    }
}