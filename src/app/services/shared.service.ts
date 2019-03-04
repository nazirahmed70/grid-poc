import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private interactiveSection = new BehaviorSubject({});
    interactiveSectionObservable: Observable<any> = this.interactiveSection.asObservable();

    constructor() {
    }

    callInteractiveSection(params) {
        this.interactiveSection.next(params);
    }

}
