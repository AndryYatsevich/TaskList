import React from 'react';
import style from './style.styl';

class Input extends React.Component { 

    render () {
        const {onChange, type, placeholder, value, label, onClick, id, key, checked} = this.props;
        console.log('type', type);
        return <div className={style.inputWrap}>
                <input 
                onChange={onChange} 
                type={type}
                placeholder={placeholder}
                value={value}
                onClick={onClick}
                id={id}
                key={key}
                checked={checked}></input>
                {type==='checkbox' ? <label>{label}</label> : ''}
            </div>
    }
}

export default Input;