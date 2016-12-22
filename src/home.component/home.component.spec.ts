import "reflect-metadata";
import {} from 'jasmine';

import { HomeComponent } from './home.component';

describe('create home.component', () => {

    var homeComponent: HomeComponent;
    beforeEach(() => {
        homeComponent = new HomeComponent();
    });

    it('should be created', () => {
        expect(homeComponent).toBeDefined();
    });

});
