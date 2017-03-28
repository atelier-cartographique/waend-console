/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import { Input } from '../src/Input';


export default () => {
    it('takes className as options', () => {
        const input = Input({
            className: 'class-name'
        });

        const classNames = input.node.className.split(' ');
        expect(classNames).toContain('class-name');
    });

};

