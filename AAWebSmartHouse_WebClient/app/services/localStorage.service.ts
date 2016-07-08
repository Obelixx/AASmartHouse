import { Injectable }     from '@angular/core';

@Injectable()
export class LocalStorageService {
    private localStorageKeyItem = 'AAWebSmartHouseWebClient';
    AAWebSmartHouseWebClient = {};


    constructor() {
        this.updateObjectFromLocalStorage();
        this.updateLocalStorageFromObject();
    }

    setItem(item: string, value: string) {
        this.updateObjectFromLocalStorage();
        this.AAWebSmartHouseWebClient[item] = value;
        this.updateLocalStorageFromObject();
    }

    getItem(item: string) {
        this.updateObjectFromLocalStorage();
        return this.AAWebSmartHouseWebClient["item"];
    }

    hasItem(item: string): boolean {
        this.updateObjectFromLocalStorage();
        return this.AAWebSmartHouseWebClient.hasOwnProperty(item);
    }

    clearAll(){
        this.clearLocalStorage();
    }

    private updateObjectFromLocalStorage() {
        let localStorageAsObject = JSON.parse(localStorage.getItem(this.localStorageKeyItem));
        if (localStorageAsObject !== null) {
            this.AAWebSmartHouseWebClient = JSON.parse(localStorage.getItem(this.localStorageKeyItem));
        }
    }

    private updateLocalStorageFromObject() {
        localStorage.setItem(this.localStorageKeyItem, JSON.stringify(this.AAWebSmartHouseWebClient));
    }

    private clearLocalStorage() {
        localStorage.removeItem(this.localStorageKeyItem);
    }
}