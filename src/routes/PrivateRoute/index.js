import React from 'react';
import {Route, Redirect} from 'react-router'
import fakeAuth from '../fakeAuth'

/**
 * 登录判断组件
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} userData={fakeAuth.userData}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/sign-in",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;