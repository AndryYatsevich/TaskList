import constants from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case constants.GET_ALL_TASKS:
            return action.payload;
        case constants.ADD_NEW_TASK:
            return [...state, action.payload]
        case constants.DELETE_TASK:
            for (let i = 0; i < state.length; i++) {
                if(state[i].id == action.payload) {               
                    return state.slice(0, i).concat(state.slice(i + 1));
                }           
            }
        case constants.UPDATE_TASK:
            return state.map(task => (task.id === action.payload.id ? 
                    task = action.payload :
                    task
                ));
        default:
            return state;
    }
};