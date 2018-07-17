import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import "./index.less";
import fakeAuth from "../fakeAuth";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegistrationForm extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        const {from} = this.props.location.state || {from: {pathname: "/"}}
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            fromLink: from.pathname
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const that = this;
        that.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return false;
            }
            //  {
            //     agreement: true,
            //     captcha: "11",
            //     confirm: "111",
            //     email: "11@qq.com",
            //     nickname: "魔丹座",
            //     password: "111",
            //     phone: "13592808538",
            //     prefix: "86",
            //     residence: ["zhejiang", "hangzhou", "xihu"],
            //     website: "11111.com"
            // }
            const {nickname, email} = values;
            const userData = {
                nickname: nickname,
                email: email
            }
            sessionStorage.setItem('userData', JSON.stringify(userData));

            Modal.success({
                title: `恭喜您${userData.nickname}，注册成功！`,
                content: `${userData.nickname}您成功注册魔丹座强大的自学系统，快来体验系统吧!`,
                onOk() {
                    fakeAuth.authenticate(userData, () => {
                        that.context.router.history.push(that.state.fromLink);
                    });
                },
                okText: "好的"
            });


        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两个密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }

    render() {
        const that = this;
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form className="register-form" onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '不是有效的邮箱!',
                        }, {
                            required: true, message: '请输入邮箱!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请输入确认密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        昵称&nbsp;
                            <Tooltip title="你希望别人怎么称呼你？">
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{required: true, message: '请输入昵称!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="常住地"
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                        rules: [{type: 'array', required: true, message: '请选择您的常住地!'}],
                    })(
                        <Cascader options={residences}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入手机号码!'}],
                    })(
                        <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站"
                >
                    {getFieldDecorator('website', {
                        rules: [{required: true, message: '请输入网站!'}],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="网站"
                        >
                            <Input/>
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="验证码"
                    extra="我们确认您不是机器人."
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{required: true, message: '请输入验证码!'}],
                            })(
                                <Input/>
                            )}
                        </Col>
                        <Col span={12}>
                            <Button>获取验证码</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        getValueFromEvent(e) {
                            that.setState({
                                agreement: e.target.checked
                            });
                            return e.target.checked;
                        }
                    })(
                        <Checkbox>我已经阅读 <a href="">协议</a></Checkbox>
                    )}
                </FormItem>
                <FormItem>
                    <Button type={`primary ${this.state.agreement ? "" : ''}`} disabled={!this.state.agreement}
                            className="login-form-button"
                            htmlType="submit">注册</Button>
                </FormItem>
                <FormItem>

                    <Link className="login-form-forgot" to="/sign-in">我已有帐号</Link>
                </FormItem>
            </Form>
        );
    }
}

const Register = Form.create()(RegistrationForm);
export default Register;