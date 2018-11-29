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