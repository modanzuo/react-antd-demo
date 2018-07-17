import React, {Component} from 'react';
import {Layout, Avatar, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import fakeAuth from "../fakeAuth";
import "./index.less";

const {Header} = Layout;

class MyHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userData: null
        }
    }

    componentWillMount() {
        this.setState({
            userData: fakeAuth.userData
        })
    }

    signOut() {
        fakeAuth.signout();
    }

    render() {
        let {userData} = this.state;
        return (
            <Header className="header">
                <Link to={"/"}>
                    <div className="logo">魔丹座</div>
                </Link>
                <Breadcrumb className="systemInfo">
                    <Breadcrumb.Item>
                        <Avatar style={{marginRight: '4px'}} size="small" icon="user"/> {userData.nickname}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <a href=""  onClick={e => this.signOut()}> 退出</a>
                    </Breadcrumb.Item>
                </Breadcrumb>

            </Header>
        )
    }
}

export default MyHeader;