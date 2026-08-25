import { observable, action } from 'mobx';
import { diceStore } from './dice-store';

const Cookies = require('js-cookie');

type cookieState = {
    allowCookies: boolean
};

export const cookieStore: cookieState = observable({
    allowCookies: Boolean(Cookies.get('dice'))
});

export const setAllowCookies = action((allowCookies: boolean) => {
    cookieStore.allowCookies = allowCookies;
});


export const setDiceCookie = action(() => {
    const { customHandfulls } = diceStore;

    const diceCookie = [...customHandfulls.values()].map(handfull => `${handfull.diceString}|${handfull.name}`).join(',');

    Cookies.set('dice', diceCookie);

    return diceCookie;
});