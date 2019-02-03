import React from 'react';
import {getAllTasks, addNewTask, deleteTask, updateTask, getSearchTasks} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';
import style from './style.styl';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Modal from '../../Components/modal';
import ModalDelete from '../../Components/modalDelete';
import ModalEditTask from '../../Components/modalEditTask';
import Task from '../../Components/task';
import HeaderTask from '../../Components/headerTask';

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
            taskId: e.target.id
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
            taskId: e.target.id
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

    showDoneTask = () => {
        this.setState({
            showDoneTask: !this.state.showDoneTask
        })
    }

    render () {
        return (
            <div>
                <HeaderTask
                    showDoneTask={this.showDoneTask}
                    onChangeSearch={this.onChangeSearch}
                    searchTask={this.searchTask}
                    cancelSearch={this.cancelSearch}
                    onChangeTaskName={this.onChangeTaskName}
                    addNewTask={this.addNewTask}
                    taskName={this.state.taskName}/>
                <div className="task-list">
                    <ul>
                        {this.props.tasks && this.state.showDoneTask ? 
                            this.props.tasks.filter((el)=> !el.done).map((el) => {
                                return <Task 
                                    task={el}
                                    showModal={this.showModal}
                                    showDeleteModal={this.showDeleteModal}
                                    taskDone={this.taskDone}/>;
                        }) : this.props.tasks.map((el) => {
                            return <Task 
                                task={el}
                                showModal={this.showModal}
                                showDeleteModal={this.showDeleteModal}
                                taskDone={this.taskDone}/>;
                    })}
                    </ul>
                </div>
                {this.state.showModal && 
                    <Modal closeModal={this.closeModal}>
                        <ModalEditTask
                            saveChange={this.saveChange}
                            tasks={this.props.tasks}
                            onChangeTaskName={this.onChangeTaskName}
                            taskDone={this.taskDone}
                            taskId={this.state.taskId}
                        />
                    </Modal>}
                {this.state.showDeleteModal && 
                    <Modal closeModal={this.closeDeleteModal}>
                        <ModalDelete
                            modalText={'Вы дествительно хотите удалить эту задачу?'}
                            closeDeleteModal={this.closeDeleteModal}
                            deleteItem={this.deleteTask}
                            idItem={this.state.taskId}/>
                    </Modal>}
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