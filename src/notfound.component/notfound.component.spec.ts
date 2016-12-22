import "reflect-metadata";
import {} from 'jasmine';

import { NotFoundComponent } from './notfound.component';

describe('create notfound.component', () => {

    var notFoundComponent: NotFoundComponent;
    beforeEach(() => {
        notFoundComponent = new NotFoundComponent();
    });

    it('should be created', () => {
        expect(notFoundComponent).toBeDefined();
    });

});
