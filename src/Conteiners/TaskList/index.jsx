import React from 'react';
import {getAllTasks, addNewTask, deleteTask, updateTask} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';
import style from './style.styl';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskName: null
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


    render () {
        return (
            <div>
                <div className="header">
                    <input type="checkbox" id="check2"/><label>Show done</label>
                    <input type="text"></input>
                    <input type="text" onChange={this.onChangeNewTaskName}></input>
                    <button onClick={this.addNewTask}>Add</button>
                </div>
                <div className="task-list">
                    <ul>
                        {this.props.tasks && this.props.tasks.map((el) => {
                            return <li key={el.id} className={el.done? style.done : ''}>
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
                                    </li>
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
    addNewTask,
    deleteTask,
    updateTask
})(TaskList);