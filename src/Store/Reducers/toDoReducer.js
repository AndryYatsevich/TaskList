import constants from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case constants.GET_ALL_TASKS:
            return JSON.parse(action.payload)
        default:
            return state;
    }
};