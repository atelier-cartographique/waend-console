/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import { Pager } from '../src/Pager';


export default () => {
    it('takes className as options', () => {
        const pager = Pager({
            className: 'class-name'
        });

        const classNames = pager.node.className.split(' ');
        expect(classNames).toContain('class-name');
    });

    it('has a write method', () => {
        const pager = Pager({
            className: 'class-name'
        });

        pager.write([{ text: 'A text' }]);
    });
};

