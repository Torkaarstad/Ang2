import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES] 
})
export class NavBarComponent {
    constructor(private _router: Router) { }

    isCurrentRoute(route) {
        var instruction = this._router.generate(route);
        var b = this._router.isRouteActive(instruction);

        //console.log("isCurrentRoute: route:" + route);
        //console.log("isCurrentRoute: instruction:" + instruction);
        //console.log("isCurrentRoute: b:" + b);

        return b;
    }
}