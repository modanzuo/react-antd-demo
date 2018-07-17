
/**
 * 登录验证
 * @type {{isAuthenticated: boolean, userData: {}, authenticate(*, *=): void, signout(*=): void}}
 */
const fakeAuth = {
    isAuthenticated: false,
    userData: {},
    authenticate(userData, cb) {
        this.isAuthenticated = true;
        this.userData = userData;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        sessionStorage.removeItem('userData');
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    },
    init() {
        let userData = sessionStorage.getItem('userData');
        if (userData) {
            this.isAuthenticated = true;
            this.userData = JSON.parse(userData);
        }
    }
};
export default fakeAuth;