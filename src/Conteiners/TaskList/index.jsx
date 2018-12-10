import React from 'react';
import {getAllTasks, addNewTask, deleteTask, updateTask, getSearchTasks} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';
import style from './style.styl';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskName: null,
            search: null,
            showDoneTask: false
        }
    }

    componentDidMount () {
        this.props.getAllTasks();
    }

    onChangeNewTaskName = (e) => {
        this.setState({
            newTaskName: e.target.value
        });
    }

    onChangeSearch = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    searchTask = async() => {
        this.props.getSearchTasks(this.state.search, this.state.showDoneTask);   
    }

    cancelSearch = () => {
        this.props.getAllTasks();
    }

    addNewTask = async() => {
        let task = JSON.stringify({
            text: this.state.newTaskName
        })
        this.props.addNewTask(task);
        this.setState({
            newTaskName: ''
        });
    }

    taskDone = async(e) => {
        let currentTask = this.props.tasks.filter((el) => el.id == e.target.id);
        currentTask[0].done = !currentTask[0].done
        this.props.updateTask(e.target.id, JSON.stringify(currentTask[0]));
    }

    deleteTask = async(e) => {
        this.props.deleteTask(e.target.id);
    }

    renderListItem = (el) => {
        return (<li key={el.id} className={el.done? style.done : ''}>
        <div className={style.listItem}>
            <div className={style.taskText}>
                <div className={style.taskCheckbox} >
                    <input id={el.id} 
                        key={el.id} 
                        onChange={this.taskDone}                        
                        type='checkbox'
                        checked={el.done ? true : false}
                    />
                </div>
                {el.text}
            </div>
            {!el.done ? 
                <div className={style.taskBtn}>
                    <button>Редактировать</button>
                    <button id={el.id} onClick={this.deleteTask}>Удалить</button>
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
                    <input type="checkbox" 
                        id="check2" 
                        onClick={this.showDoneTask}
                        />
                        <label>Show done</label>
                    <input type="text"
                        onChange={this.onChangeSearch}
                        placeholder="Поиск" />
                    <button onClick={this.searchTask}>Search</button>
                    <button onClick={this.cancelSearch}>Cancel Search</button>
                    <input type="text" 
                        onChange={this.onChangeNewTaskName} 
                        value={this.state.newTaskName}
                        placeholder="Введите название задачи"
                        />
                    <button onClick={this.addNewTask}>Add</button>
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