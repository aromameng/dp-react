import React, { Component } from 'react';
import Header from 'components/common/Header'
import '../page.scss'

import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class Test extends Component {
    constructor() {
        super();
        this.state = {
            type: 'money',
        }
    }    
    componentDidMount(){
        
    }

    handleClick = () => {
        this.customFocusInst.focus();
    }

    submit(){
        this.props.form.validateFields((error, value) => {
             console.log(error, value);
        });
    }

    render() {
        const { type } = this.state;
        let errors;
        const {getFieldProps, getFieldError} = this.props.form;

        return (
         <div className='view-form'>
            <Header title={'表单测试'} showBack={'true'}></Header>
            <div className="c-content">
                <List>
                <InputItem
                    placeholder="请输入姓名"
                    clear
                    moneyKeyboardAlign="left"
                    {...getFieldProps('name', {
                        rules: [{required: true,message:'姓名不能为空'}],
                      })}
                    ref={el => this.customFocusInst = el}
                >姓名</InputItem>
                <InputItem                   
                    type={type}
                    placeholder="请输入年龄"
                    clear
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                    {...getFieldProps('age',{})}
                >年龄</InputItem>
                </List>    
                <div className='errors'>{(errors = getFieldError('name')) ? errors.join(',') : null}</div>
                <div
                    style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                    onClick={this.handleClick}
                    >
                    click to focus
                </div>
                <Button onClick={this.submit.bind(this)}>提交</Button>
            </div>
         </div>
        )
    }
}

const TestWrapper = createForm()(Test);
module.exports = TestWrapper;