import React, {Component} from 'react';
import {Prompt} from "react-router"

class Test2 extends Component {
    render() {
        return (
            <div>
                我是来测试2的。
                <Prompt message={location => (
                    `Are you sue you want to go to ${location.pathname}?`
                )}/>
            </div>
        )
    }
}

export default Test2;