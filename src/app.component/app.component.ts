import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component/app.component.html'
})
export class AppComponent {
    constructor(private router: Router) {}

    isActive(path: string): boolean { return this.router.isActive(path, false); }
}
