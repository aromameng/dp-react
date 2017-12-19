/*
  tab切换插件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './components.scss';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            active:0
        }
    }
    handleTab(index){
        this.setState({
            active:index
        })
    }
    render() {
        const { title,content } = this.props;
        const {active}=this.state;
        return (
        <div className='cp-nav'>
            <div className='cp-nav-head'>
                <ul>{title.map((item,index)=>{
                    return(<li key={index} onClick={this.handleTab.bind(this,index)} className={active==index ? 'active' : ''}>{item}</li>)
                })}</ul>
            </div>
            <div className='cp-nav-body'>
                <ul>{content.map((item,index)=>{
                    return(<li key={index} className={active==index ? 'active' : ''}>{item}</li>)
                })}</ul>
            </div>
        </div>
        )
    }
}
export default Nav;