import {useState} from 'react';

const Cookies = require('js-cookie');

function Cookie() {
    const [cookieValue, setCookieValue] = useState(Cookies.get('dice'));

    return <div>
        <div>
            {cookieValue ?? 'no dice cookie found'}
        </div>
        <button onClick={() => {
            Cookies.remove('dice');
            setCookieValue(undefined);
        }}>{'delete cookie'}</button>
    </div>
}

export default Cookie;
