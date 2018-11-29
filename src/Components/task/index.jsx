import React from 'react';

class Task extends React.Component { 

    render () {
        console.log(this.props);
        return <li>{this.props.task.text}</li>
    }
}

export default Task;