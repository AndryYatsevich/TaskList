import React from 'react';

class TaskList extends React.Component {
    
    renderTaskList = (tasks) => {tasks && tasks.map((el) => {
        console.log('sdf', el);
        return <div>sdfs</div>
    })}

    render () {
        const tasks = [
            {
                id: 1,
                value: "ToDo Item 1"
            },
            {
                id: 2,
                value: "ToDo Item 2"
            },
            {
                id: 3,
                value: "ToDo Item 3"
            },
            {
                id: 4,
                value: "ToDo Item 4"
            },
            {
                id: 5,
                value: "ToDo Item 5"
            },
        ]
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
                        {this.renderTaskList(tasks)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TaskList;