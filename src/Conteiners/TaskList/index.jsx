import React from 'react';
import {getAllTasks, addNewTask, deleteTask, updateTask, getSearchTasks} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';
import style from './style.styl';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Modal from '../../Components/modal';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: null,
            search: null,
            showDoneTask: false,
            showModal: false,
            showDeleteModal: false
        }
    }

    componentDidMount () {
        this.props.getAllTasks();
    }

    showModal = (e) => {
        this.setState({
            showModal: true,
            idTaskForModal: e.target.id
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    showDeleteModal = (e) => {
        this.setState({
            showDeleteModal: true,
            idCategoryForModal: e.target.id
        })
    }

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false
        })
    }



    onChangeTaskName = (e) => {
        this.setState({
            taskName: e.target.value
        });
    }

    onChangeSearch = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    searchTask = () => {
        this.props.getSearchTasks(this.state.search, this.state.showDoneTask);
    }

    cancelSearch = () => {
        this.props.getAllTasks();
    }

    addNewTask = () => {
        let task = JSON.stringify({
            text: this.state.taskName
        })
        this.props.addNewTask(task);
        this.setState({
            taskName: ''
        });
    }

    taskDone = (e) => {
        let currentTask = this.props.tasks.filter((el) => el.id == e.target.id);
        currentTask[0].done = !currentTask[0].done
        this.props.updateTask(e.target.id, JSON.stringify(currentTask[0]));
    }

    deleteTask = (id) => {
        this.props.deleteTask(id);
        this.closeDeleteModal();
    }

    saveChange = (id) => {
        let chengedTask = {
            done: false,
            text: this.state.taskName
        }
        this.props.updateTask(id, JSON.stringify(chengedTask));
        this.setState({
            showModal: false
        })
    }

    /**
     * Модалка подтверждения удаления
     */
    renderModalDeleteBody = () => {
        return (<div className={style.modal}>
            <div className={style.modalCaption}>
                <h3>Удаление задачи: </h3>
            </div>
            <div className={style.modalBody}>
                <div className={style.modalItem}>
                    Вы дествительно хотите удалить эту задачу?
                </div>
            </div>
            <div className={style.modalFooter}>
                <Button 
                    modify={'danger'}
                    label={'Удалить'}
                    onClick={() => this.deleteTask(this.state.idCategoryForModal)}/>
                <Button 
                    label={'Отмена'}
                    onClick={() => this.closeDeleteModal()}/>
            </div>
        </div>)
    }

    /**
     * Модалка редактирования
     */
    renderModalBody = () => {
        let currentTask = this.props.tasks.filter((el) => el.id == this.state.idTaskForModal);
        return (<div>
            <div>
                {currentTask && currentTask.map((el) => {
                    return (<div className={style.modal}>
                        <div className={style.modalCaption}>
                            <h3>Редактирование задачи: </h3>
                        </div>
                        <div className={style.modalBody}>
                            <div className={style.modalItem}>
                                <Input 
                                    defaultValue={el.text}
                                    onChange={this.onChangeTaskName}/>
                            </div>
                            <div className={style.modalItem}>
                                <Input 
                                    type='checkbox'
                                    onChange={this.taskDone}
                                    label={'Is Done'}
                                    id={el.id}
                                    key={el.id}
                                    checked={el.done ? true : false}/>
                            </div>
                        </div>
                        <div className={style.modalFooter}>
                            <Button 
                                label={'Сохранить изменения'}
                                onClick={() => this.saveChange(el.id)}/>
                        </div>
                        </div>)
                })}
            </div>
            </div>)
    }

    renderListItem = (el) => {
        return (<li key={el.id} className={el.done? style.done : ''}>
        <div className={style.listItem}>
            <div className={style.taskText}>
                <div className={style.taskCheckbox} >
                    <Input 
                        type='checkbox'
                        onChange={this.taskDone}
                        id={el.id}
                        key={el.id}
                        checked={el.done ? true : false}/>
                </div>
                {el.text}
            </div>
            {!el.done ? 
                <div className={style.taskBtn}>
                    <Button 
                        label={'Редактировать'}
                        id={el.id}
                        onClick={(e) => this.showModal(e)}/>
                    <Button 
                        modify={'danger'}
                        label={'Удалить'}
                        id={el.id}
                        onClick={(e) => this.showDeleteModal(e)}/>
                </div> :
            ''
            }
            
        </div>
    </li>)
    }

    showDoneTask = () => {
        this.setState({
            showDoneTask: !this.state.showDoneTask
        })
    }


    render () {
        return (
            <div>
                <div className="header">
                    <Input 
                        type="checkbox"
                        onClick={this.showDoneTask}
                        label={'Show done'}/>
                    <Input 
                        type="text"
                        onChange={this.onChangeSearch}
                        placeholder="Поиск" />
                    <Button 
                        label={'Search'}
                        onClick={this.searchTask}/>
                    <Button 
                        label={'Cancel Search'}
                        onClick={this.cancelSearch}/>
                    <Input 
                        type="text"
                        onChange={this.onChangeTaskName}
                        placeholder="Введите название задачи" 
                        value={this.state.taskName}/>
                    <Button 
                        label={'Add'}
                        onClick={this.addNewTask}/>
                </div>
                <div className="task-list">
                    <ul>
                        {this.props.tasks && this.state.showDoneTask ? 
                            this.props.tasks.filter((el)=> el.done).map((el) => {
                                return this.renderListItem(el);
                        }) : this.props.tasks.map((el) => {
                                return this.renderListItem(el);
                    })}
                    </ul>
                </div>
                {this.state.showModal && <Modal closeModal={this.closeModal} modalBody={this.renderModalBody}/>}
                {this.state.showDeleteModal && <Modal closeModal={this.closeDeleteModal} modalBody={this.renderModalDeleteBody}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.toDo
});

export default connect(mapStateToProps, {
    getAllTasks,
    getSearchTasks,
    addNewTask,
    deleteTask,
    updateTask
})(TaskList);