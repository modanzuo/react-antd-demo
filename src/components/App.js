import React, {Component} from 'react';
import './App.css';
import {Layout} from 'antd';
import MyHeader from "../routes/header";
import Menus from "../routes/menus";
import BreadcrumbCustom from "../routes/BreadcrumbCustom";

const {Content, Footer} = Layout;

class App extends Component {


    render() {
        return (
            <Layout style={{height:'100%'}}>
                <MyHeader/>
                <Layout>
                    <Menus />
                    <Layout style={{padding: '0 24px 24px'}}>
                        <BreadcrumbCustom />
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                            {this.props.children}
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            MoDanZuo ©2018 Created by Ant UED
                        </Footer>
                    </Layout>

                </Layout>
            </Layout>
        );
    }
}

export default App;
