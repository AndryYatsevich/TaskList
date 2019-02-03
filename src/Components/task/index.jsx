import React from 'react';
import style from '../../Conteiners/TaskList/style.styl';
import Button from '../button';
import Input from '../input';

class Task extends React.Component { 

    render () {
        const {task, showModal, showDeleteModal, taskDone} = this.props;
        return <li key={task.id} className={task.done? style.done : ''}>
            <div className={style.listItem}>
                <div className={style.taskText}>
                    <div className={style.taskCheckbox} >
                        <Input 
                            type='checkbox'
                            onChange={taskDone}
                            id={task.id}
                            key={task.id}
                            checked={task.done ? true : false}/>
                    </div>
                    {task.text}
                </div>
                {!task.done ? 
                    <div className={style.taskBtn}>
                        <Button 
                            label={'Редактировать'}
                            id={task.id}
                            onClick={(e) => showModal(e)}/>
                        <Button 
                            modify={'danger'}
                            label={'Удалить'}
                            id={task.id}
                            onClick={(e) => showDeleteModal(e)}/>
                    </div> :
                ''}            
            </div>
        </li>}
    }

export default Task;