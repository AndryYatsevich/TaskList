import React from 'react';
import style from '../Conteiners/TaskList/style.styl';
import Button from './button';

class ModalDelete extends React.Component {
    
    render() {
        return (
            <div className={style.modal}>
                <div className={style.modalCaption}>
                    <h3>Удаление задачи: </h3>
                </div>
                <div className={style.modalBody}>
                    <div className={style.modalItem}>
                        {this.props.modalText}
                    </div>
                </div>
                <div className={style.modalFooter}>
                    <Button 
                        modify={'danger'}
                        label={'Удалить'}
                        onClick={() => this.props.deleteItem(this.props.idItem)}/>
                    <Button 
                        label={'Отмена'}
                        onClick={() => this.props.closeDeleteModal()}/>
                </div>
            </div>
        )
    }
}

export default ModalDelete;