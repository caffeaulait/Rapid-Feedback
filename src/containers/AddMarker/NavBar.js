import React from 'react';
import SysLog from '../assets/images/SysLog.png';
import './NavBar.css';

class NavBar extends React.Component {

    state={
        isOpen:false
    }

    handleClick=()=>{
        this.setState({isOpen:!this.state.isOpen})
    }
    render () {
        return (
            <nav>
                <div className='logo'>
                    <div className='imgBox'>
                        <img className = 'SysLog' src= {SysLog} alt="System Logo" />
                    </div>
                    <div className="btn" onClick={this.handleClick}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>

                <ul className={this.state.isOpen ? "showNav" : "undefined"}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Administration</a></li>
                    <li><a href="#">Assessment</a></li>
                    <li><a href="#">Report</a></li>
                </ul>
            </nav>
        );
    }

}

export default NavBar;