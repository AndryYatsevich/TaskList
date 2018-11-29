import constants from '../constants';

export const getCategory = () => (dispatch) => {
    fetch('http://localhost:3000/category', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.text().then((category) => {
            dispatch({
                type: constants.GET_CATEGOTY,
                payload: category
            });
        });
    })
}