import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {routesItem} from "../data";


class BreadcrumbCustom extends Component {
    //利用PropTypes记住所跳转每个页面的位置
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: null,
            breadcrumbNameMap: null
        }
    }

    /**
     *  对路径进行切分，存放到this.state.pathSnippets中
     */
    getPath() {
        this.setState({
            pathSnippets: this.context.router.history.location.pathname.split('/').filter(i => i)
        });
    }

    componentWillMount() {
        //首次加载的时候调用，形成面包屑
        this.getPath();
        let breadcrumbNameMap = {};
        routesItem.map(item => {
            const {link, name, params} = item;
            breadcrumbNameMap[link] = name;
            if (params && params.length > 0) {
                params.map(_ => {
                    const {link: link2, name} = _;
                    breadcrumbNameMap[`${link}/${link2}`] = name;
                    return false;
                });
            }
            return false;
        })
        this.setState({
            breadcrumbNameMap: breadcrumbNameMap
        })
    }

    componentWillReceiveProps() {
        //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
        this.getPath();
    }

    extraBreadcrumbItems() {
        if (!this.state.pathSnippets || this.state.pathSnippets.length <= 0) {
            return <Breadcrumb.Item>
                <Link to='/'>
                    首页
                </Link>
            </Breadcrumb.Item>
        }
        return this.state.pathSnippets.map((_, index) => {
            const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {this.state.breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        })
    }

    render() {
        return (
            <span>
                <Breadcrumb style={{margin: '12px 0'}}>
                    {this.extraBreadcrumbItems()}
                </Breadcrumb>
            </span>
        )
    }
}

export default BreadcrumbCustom;