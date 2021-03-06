import constants from '../Constants/toDoConstants';

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
                payload: JSON.parse(tasks)
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
                payload: JSON.parse(tasks)
            });
        });
    })
}

export const addNewTask = (task) => (dispatch) => {
    fetch('http://localhost:3000/task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: task
        }).then((response) => {
            return response.text().then((task) => {
                dispatch({
                    type: constants.ADD_NEW_TASK,
                    payload: JSON.parse(task)
                });
            });
        }
    )
}

export const deleteTask = (taskId) => (dispatch) => {
    fetch('http://localhost:3000/task/' + taskId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(()=> {
            dispatch({
                type: constants.DELETE_TASK,
                payload: taskId
            });
        }
    )    
}

export const updateTask = (id, task) => (dispatch) => {
    fetch('http://localhost:3000/task/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: task
        }).then((response) => {
            return response.text().then((task) => {     
                dispatch({
                    type: constants.UPDATE_TASK,
                    payload: JSON.parse(task)
                });   
            });
        }
    );    
}