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
        await fetch('http://localhost:3000/task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: this.state.newTaskName
            })
        }).then((response) => {
            return response.text().then((task) => {
                this.props.addNewTask(task);
            });
        });
        this.setState({
            newTaskName: ''
        });
    }

    taskDone = async(e) => {
        let currentTask = this.props.tasks.filter((el) => el.id == e.target.id);
        currentTask[0].done = !currentTask[0].done
        await fetch('http://localhost:3000/task/' + e.target.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentTask[0])
        }).then((response) => {
            return response.text().then((task) => {     
                return this.props.updateTask(JSON.parse(task));    
            });
        });
    }

    deleteTask = async(e) => {
        let id = e.target.id;
        await fetch('http://localhost:3000/task/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        await this.props.deleteTask(id);
    }

    renderListItem = (el) => {
        return (<li key={el.id} className={el.done? style.done : ''}>
        <div className={style.listItem}>
            <div>
                <input id={el.id} 
                    key={el.id} 
                    onChange={this.taskDone} 
                    type='checkbox' 
                />
            </div>
            <div className={style.taskText}>
                {el.text}
            </div>
            <div className={style.taskBtn}>
                <button>Редактировать</button>
                <button id={el.id} onClick={this.deleteTask}>Удалить</button>
            </div>
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