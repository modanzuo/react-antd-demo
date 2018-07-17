import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

export default function request(method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
        try {
            fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
                },
                body
            }).then((res) => {
                if (res.status === 401) {
                    history.push("/login");
                    return reject('Unauthorized.');
                } else {
                    const token = res.headers.get('access-token');
                    if (token) {
                        sessionStorage.setItem('access_token', token);
                    }
                    return resolve(res.json());
                }
            });
        } catch (e) {
            reject(e);
        }

    })
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);