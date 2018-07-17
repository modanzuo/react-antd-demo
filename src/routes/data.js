import Login from '../routes/singIn/login';
import Register from '../routes/singIn/register';
import Home from '../components/home'
import Test from '../components/test'
import Test2 from '../components/test2'

/**
 *
 * @type {*[]}
 * @name  模块名称
 * @link  模块链接
 * @component  模块
 * @hide   是否不在菜单显示
 * @exact   是否精确匹配link
 * params  子菜单
 * type 菜单图标类型
 */
const routesItem = [
    {
        type: "home",
        name: "首页",
        link: "/",
        component: Home,
        hide: true,
        exact: true
    },
    {
        type: "user",
        name: "用户",
        link: "/user",
        component: Test,
        params: [
            {
                type: "",
                name: "测试",
                link: "test",
                component: Test
            }, {
                type: "",
                name: "测试2",
                link: "test2",
                component: Test2
            }
        ]
    }

];
const loginRoutes = [
    {
        type: "login",
        name: "登录",
        link: "/sign-in/",
        component: Login,
        hide: true,
        exact: true
    }, {
        type: "register",
        name: "注册",
        link: "/sign-in/register",
        component: Register,
        hide: true,
        exact: true
    },
]


export {routesItem, loginRoutes};

