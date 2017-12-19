import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

    render() {
        const { title,showBack } = this.props;
        const isShowBack=showBack ? 'aside back show' : 'aside back hide';
        return <header className='J-header'>
            <div className="head">
                <div className={isShowBack} onClick={this.goBack.bind(this)}>
                    <i className="icon iconfont icon-icon_right"></i>
                </div>
                <div className="title">{title}</div>
            </div>
            <div className="header_fill"></div>
        </header>
    }
    goBack() {
        window.history.back()
    }
}

export default Header;