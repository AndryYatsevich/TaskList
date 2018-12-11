import React from 'react';
import {getAllTasks, addNewTask, deleteTask, updateTask, getSearchTasks} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';
import style from './style.styl';
import Input from '../../Components/input';
import Button from '../../Components/button';

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

    addNewTask = () => {
        let task = JSON.stringify({
            text: this.state.newTaskName
        })
        this.props.addNewTask(task);
        this.setState({
            newTaskName: ''
        });
    }

    taskDone = (e) => {
        let currentTask = this.props.tasks.filter((el) => el.id == e.target.id);
        currentTask[0].done = !currentTask[0].done
        this.props.updateTask(e.target.id, JSON.stringify(currentTask[0]));
    }

    deleteTask = (e) => {
        this.props.deleteTask(e.target.id);
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
                        label={'Редактировать'}/>
                    <Button 
                        label={'Удалить'}
                        id={el.id}
                        onClick={this.deleteTask}/>
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
                        onChange={this.onChangeNewTaskName}
                        placeholder="Введите название задачи" 
                        value={this.state.newTaskName}/>
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