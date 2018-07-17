import React, {Component} from 'react';
import {Layout} from 'antd';

class SingIn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {

        return (
            <Layout >
                {this.props.children}
            </Layout>
        )
    }
}

export default SingIn