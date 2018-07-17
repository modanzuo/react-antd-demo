import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import fakeAuth from "../fakeAuth";
import {get} from "../../utils/request";
import PropTypes from "prop-types";
import "./index.less";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        const {from} = this.props.location.state || {from: {pathname: "/"}}
        this.state = {
            redirectToReferrer: false,
            userName: null,
            password: null,
            remember: true,
            fromLink: from.pathname
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            const {userName, password, remember} = values;
            console.log("userName:", userName, " password:", password, " remember:", remember);
            const userData = {
                nickname: userName
            }
            sessionStorage.removeItem('userLogin')
            if (remember === true) {
                sessionStorage.setItem('userLogin', JSON.stringify({...values}));
            }
            sessionStorage.setItem('userData', JSON.stringify(userData));
            fakeAuth.authenticate(userData, () => {
                this.props.history.push(this.state.fromLink)
            });
        });
    }

    async componentWillMount() {
        console.log(this.props);
        try {
            const userLogin = sessionStorage.getItem('userLogin');
            if (userLogin) {
                this.setState({
                    ...JSON.parse(userLogin)
                });
            }
            const url = "/login";
            const data = await  get(url);
            console.log(data);

        } catch (e) {
            message.error("网络异常");
        }
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        if (this.state.redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                        initialValue: this.state.userName
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                        initialValue: this.state.password
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password" placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: this.state.remember,
                    })(
                        <Checkbox>记录密码</Checkbox>
                    )}
                    <Link className="login-form-forgot" to={""}>忘记密码</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <Link className="login-form-forgot" to="/sign-in/register">注册</Link>
                </FormItem>
            </Form>

        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;