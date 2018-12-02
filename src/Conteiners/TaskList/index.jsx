import React from 'react';
import {getAllTasks} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';

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
        });
        await this.props.getAllTasks();
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
        });
        await this.props.getAllTasks();
    }

    deleteTask = async(e) => {
        await fetch('http://localhost:3000/task/' + e.target.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        await this.props.getAllTasks();
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
                            return <li key={el.id} className={el.done? 'done' : ''}>
                                        <input id={el.id} key={el.id} onChange={this.taskDone} type='checkbox'></input>
                                        {el.text}
                                        <button>Редактировать</button>
                                        <button id={el.id} onClick={this.deleteTask}>Удалить</button>
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
    getAllTasks
})(TaskList);