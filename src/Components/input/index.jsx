import React from 'react';
import style from './style.styl';

class Input extends React.Component { 

    render () {
        const {onChange, type, placeholder, value, defaultValue, label, onClick, id, key, checked} = this.props;
        return <div className={style.inputWrap}>
                    <input 
                        className={style.input}
                        onChange={onChange} 
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={defaultValue}
                        onClick={onClick}
                        id={id}
                        key={key}
                        checked={checked} />
                    {type==='checkbox' ? <label className={style.label}>{label}</label> : ''}
            </div>
    }
}

export default Input;