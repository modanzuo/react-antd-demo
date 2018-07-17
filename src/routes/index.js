import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router'
import App from '../components/App.js'
import {routesItem, loginRoutes} from "./data";
import PrivateRoute from "./PrivateRoute";
import fakeAuth from "../routes/fakeAuth";
import SingIn from "../routes/singIn"


import {Layout} from 'antd';

export default class RouterIndex extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: routesItem
        }
        fakeAuth.init();
    }

    getRoute(data, pLink) {
        return data.map((item, index) => {
            const {link, component, exact} = item;
            return <PrivateRoute path={`${pLink}/${link}`} key={`route${index}`} exact={exact} component={component}/>
        })
    }

    getRouter() {
        return this.state.menu.map((item, index) => {
            const {link, params, component, exact} = item;
            if (params && params.length > 0) {
                return (<Switch path={link} key={`router${index}`} exact={exact} component={component}>
                    {this.getRoute(params, link)}
                </Switch>)
            }
            return <PrivateRoute path={link} key={`router${index}`} exact={exact} component={component}/>
        })
    }

    getLogin() {
        return loginRoutes.map((item, index) => {
            const {link, component, exact} = item;
            return <Route path={link} key={`login${index}`} exact={exact} component={component}/>
        })
    }

    render() {
        const getRouter = this.getRouter();
        return (
            <BrowserRouter>
                <Layout style={{height: "100%"}}>
                    <Switch>
                        <SingIn path="/sign-in" component={SingIn}>
                            {this.getLogin()}
                        </SingIn>
                        <App path="/" component={App}>
                            {getRouter}
                        </App>
                    </Switch>
                </Layout>
            </BrowserRouter>
        )
    }
}
