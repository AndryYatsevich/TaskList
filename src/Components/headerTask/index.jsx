import React from 'react';
import Button from '../button';
import Input from '../input';

class HeaderTask extends React.Component {
    render () {
        const {
            showDoneTask, 
            onChangeSearch, 
            searchTask, 
            cancelSearch, 
            onChangeTaskName, 
            addNewTask,
            taskName
        } = this.props;
        return (
            <div className="header">
                <Input 
                    type="checkbox"
                    onClick={showDoneTask}
                    label={'Show done'}/>
                <Input 
                    type="text"
                    onChange={onChangeSearch}
                    placeholder="Поиск" />
                <Button 
                    label={'Search'}
                    onClick={searchTask}/>
                <Button 
                    label={'Cancel Search'}
                    onClick={cancelSearch}/>
                <Input 
                    type="text"
                    onChange={onChangeTaskName}
                    placeholder="Введите название задачи" 
                    value={taskName}/>
                <Button 
                    label={'Add'}
                    onClick={addNewTask}/>
            </div>
        )
    }
}
export default HeaderTask;