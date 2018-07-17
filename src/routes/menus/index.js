import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

import {routesItem} from "../data";
import PropTypes from "prop-types";

const {SubMenu} = Menu;
const {Sider} = Layout;


class Menus extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: routesItem,
            defaultOpenKeys: [],
            defaultSelectedKeys: []
        }
    }

    componentWillMount() {
        let defaultOpenKeys = [];
        const menu = this.context.router.history.location.pathname.split('/').filter(i => i)
        console.log(menu);
        this.state.menu.map((item, index) => {
            const {link} = item;
            if (menu && menu.length > 0 && link === "/" + menu[0]) {
                defaultOpenKeys.push(`sub${index}`)
            }
            return false;
        })
        this.setState({
            defaultOpenKeys: defaultOpenKeys,
            defaultSelectedKeys: [this.context.router.history.location.pathname]
        })
    }

    /**
     * 子菜单
     */
    getMenu(item, links) {
        return item.map((item, index) => {
            const {name, link} = item;
            const LinkUrl = `${links}/${link}`;
            return <Menu.Item key={LinkUrl}><Link to={LinkUrl}>{name}</Link></Menu.Item>
        })
    }

    /**
     * 根菜单
     */
    getSubMenu() {
        return this.state.menu.map((item, index) => {
            const {type, name, link, params, hide} = item;
            if (hide) {
                return null;
            }
            return <SubMenu key={`sub${index}`} title={<span><Icon type={type}/>{name}</span>}>
                {params && params.length > 0 ? this.getMenu(params, link) : null}
            </SubMenu>
        })
    }

    render() {

        return (
            <Sider width={200}>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{height: '100%', borderRight: 0}}
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    selectedKeys={[this.context.router.history.location.pathname]}
                    defaultOpenKeys={this.state.defaultOpenKeys}
                >
                    {this.getSubMenu()}
                </Menu>
            </Sider>
        )
    }
}

export default Menus;