import constants from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case constants.GET_CATEGOTY:
            return JSON.parse(action.payload)
        default:
            return state;
    }
};