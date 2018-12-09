import constants from '../constants';

export const getAllTasks = () => (dispatch) => {
    fetch('http://localhost:3000/task', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.text().then((tasks) => {
            dispatch({
                type: constants.GET_ALL_TASKS,
                payload: tasks
            });
        });
    })
}

export const getSearchTasks = (name, done) => (dispatch) => {
    fetch('http://localhost:3000/task?text_like=' + name + '&done=' + done, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.text().then((tasks) => {
            dispatch({
                type: constants.GET_ALL_TASKS,
                payload: tasks
            });
        });
    })
}

export const addNewTask = (task) => (dispatch) => {
    dispatch({
        type: constants.ADD_NEW_TASK,
        payload: task
    });
}

export const deleteTask = (taskId) => (dispatch) => {
    dispatch({
        type: constants.DELETE_TASK,
        payload: taskId
    });
}

export const updateTask = (tasks) => (dispatch) => {
    dispatch({
        type: constants.UPDATE_TASK,
        payload: tasks
    });
}