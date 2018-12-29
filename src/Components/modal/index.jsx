import React from 'react';
import style from './style.styl';
import Input from '../input';

class Modal extends React.Component {
    
    
    click = (e) => {
        e.stopPropagation();
    }

    render () {
        const {closeModal, modalBody} = this.props;
        return <div className={style.modal} onClick={closeModal}>
                    <div className={style.modalBody} onClick={(e) => this.click(e)}>
                        {modalBody()}
                    </div>
            </div>
    }
}

export default Modal;