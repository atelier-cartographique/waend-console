
import * as Promise from 'bluebird';
import { uniqueId } from 'lodash';
import { dom } from 'waend-util';

const { addClass, DIV, removeElement } = dom;

export interface IDisplay {
    node: HTMLElement;
    shutdown: () => void;
}

export type EndFn = (a: HTMLElement) => Promise<void>;

export const Display: (a: EndFn) => IDisplay =
    (onShutdown) => {
        const id = uniqueId('wc-display-');
        const node = DIV();
        let isOn = true;

        addClass(node, 'wc-display');
        node.setAttribute('id', id);


        const shutdown =
            () => {
                if (isOn) {
                    isOn = false;
                    // here I wonder if a `finally` would do better
                    onShutdown(node)
                        .then(() => removeElement(node))
                        .catch(() => removeElement(node));
                }
            }

        return { node, shutdown };
    }