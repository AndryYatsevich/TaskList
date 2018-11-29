import React from 'react';
import {getAllTasks} from '../../Store/Actions/toDoAction';
import {connect} from 'react-redux';

class TaskList extends React.Component {

    componentDidMount () {
        this.props.getAllTasks();
    }
    
    renderTaskList = (tasks) => {tasks && tasks.map((el) => {
        console.log('sdf', el);
        return <div>sdfs</div>
    })}

    render () {
        return (
            <div>
                <div className="header">
                    <input type="checkbox" id="check2"/><label>Show done</label>
                    <input type="text"></input>
                    <input type="text"></input>
                    <button>Add</button>
                </div>
                <div className="task-list">
                    <ul>
                        {this.renderTaskList()}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
});

export default connect(mapStateToProps, {
    getAllTasks
})(TaskList);