import React from 'react';
import style from '../Conteiners/TaskList/style.styl';
import Button from './button';
import Input from './input';

class ModalEditTask extends React.Component {
    
    render() {
        let currentTask = this.props.tasks.filter((el) => el.id == this.props.taskId);
        return (
            <div>
                <div>
                    {currentTask && currentTask.map((el) => {
                        return (
                            <div className={style.modal}>
                                <div className={style.modalCaption}>
                                    <h3>Редактирование задачи: </h3>
                                </div>
                                <div className={style.modalBody}>
                                    <div className={style.modalItem}>
                                        <Input 
                                            defaultValue={el.text}
                                            onChange={this.props.onChangeTaskName}/>
                                    </div>
                                    <div className={style.modalItem}>
                                        <Input 
                                            type='checkbox'
                                            onChange={this.props.taskDone}
                                            label={'Is Done'}
                                            id={el.id}
                                            key={el.id}
                                            checked={el.done ? true : false}/>
                                    </div>
                                </div>
                                <div className={style.modalFooter}>
                                    <Button 
                                        label={'Сохранить изменения'}
                                        onClick={() => this.props.saveChange(el.id)}/>
                                </div>
                            </div>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }
}

export default ModalEditTask;