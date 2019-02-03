import constants from '../Constants/categoriesConstants';

export default (state = [], action) => {
    switch (action.type) {
        case constants.GET_CATEGOTY:
            return action.payload;
        case constants.ADD_NEW_CATEGORY:
            return [...state, action.payload];
        case constants.DELETE_CATEGORY:
            for (let i = 0; i < state.length; i++) {
                if(state[i].id == action.payload) {               
                    return state.slice(0, i).concat(state.slice(i + 1));
                }           
            }
        default:
            return state;
    }
};