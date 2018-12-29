import React from 'react';
import style from './style.styl';

class Button extends React.Component {
    render () {
        const {onClick, label, id, modify} = this.props;        
        return <button 
                    id={id}
                    className={style.button + ' ' + style[modify]}
                    onClick={onClick}>
                    {label}
                </button>            
    }
}

export default Button;