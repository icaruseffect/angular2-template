import "reflect-metadata";
import {} from 'jasmine';

import { AppComponent } from './app.component';

describe('create app.component', () => {

    var appComponent: AppComponent;
    beforeEach(() => {
        appComponent = new AppComponent(null /* router */);
    });

    it('should be created', () => {
        expect(appComponent).toBeDefined();
    });

});
