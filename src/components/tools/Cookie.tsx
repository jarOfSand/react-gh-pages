import { useState } from 'react';
import { cookieStore, setAllowCookies, setDiceCookie } from '../../stores/cookie-store';

const Cookies = require('js-cookie');

function Cookie() {
    const [cookieValue, setCookieValue] = useState(Cookies.get('dice'));

    const enableDiceButton = <button onClick={() => {
        setAllowCookies(true);
        const cookie = setDiceCookie();
        setCookieValue(cookie);
    }}>{'allow dice cookie'}</button>
    const disableDiceButton = <button onClick={() => {
        Cookies.remove('dice');
        setCookieValue(undefined);
        setAllowCookies(false);
    }}>{'delete and disable dice cookie'}</button>

    return <div>
        {cookieStore.allowCookies ? disableDiceButton : enableDiceButton}
        <div style={{ backgroundColor: '#bbb', fontFamily: 'monospace', marginTop: '5px' }}>
            {cookieValue ?? 'no dice cookie found'}
        </div>
    </div>
}

export default Cookie;
