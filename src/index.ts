/*
 * src/webconsole/index.ts
 *
 *
 * Copyright (C) 2015  Pierre Marchand <pierremarc07@gmail.com>
 *
 * License in LICENSE file at the root of the repository.
 *
 */



import { getconfig } from 'waend-lib';
import { Bind, getBinder, setenv, configure as initSync } from 'waend-shell';
import createMap from 'waend-map';
import { Console } from './Console';
import { initHistory } from "./WebHistory";

const withBinder: (a: Bind) => void =
    (binder) => {
        const elementWC = document.querySelector('#wc');
        const elementMap = document.querySelector('#map');
        if (elementWC && elementMap) {
            const wcons = Console();
            elementWC.appendChild(wcons.node);
            const shell = wcons.start();


            binder.getMe()
                .then(user => { shell.loginUser(user); })
                .catch(() => 0);


            getconfig('loginUrl').then((url) => setenv('LOGIN_URL', url));
            getconfig('defaultProgramUrl').then((defaultProgramUrl) => {
                getconfig('mediaUrl').then((mediaUrl) => {
                    setenv('map', createMap(
                        elementMap, defaultProgramUrl, mediaUrl));
                });
            });
            getconfig('notifyUrl').then(initSync);


            const historyPopContext: (a: PopStateEvent) => void =
                (event) => {
                    if (event.state) {
                        shell.switchContext(event.state);
                    }
                };

            shell.switchContext(initHistory('/console/', historyPopContext));

        }
    }

const init = () => {
    getconfig('apiUrl')
        .then((apiUrl) => {
            withBinder(getBinder(apiUrl));
        })
}

document.onreadystatechange = () => {
    if ('interactive' === document.readyState) {
        init();
    }
};
