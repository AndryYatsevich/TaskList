import constants from '../Constants/categoriesConstants';

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
                payload: JSON.parse(category)
            });
        });
    })
}

export const addNewCategory = (category) => (dispatch) => {
    fetch('http://localhost:3000/category', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: category
        }).then((response) => {
            return response.text().then((category) => {
                dispatch({
                    type: constants.ADD_NEW_CATEGORY,
                    payload: JSON.parse(category)
                });
            });
        }
    )
}

export const deleteCategory = (categoryId) => (dispatch) => {
    fetch('http://localhost:3000/category/' + categoryId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(()=> {
            dispatch({
                type: constants.DELETE_CATEGORY,
                payload: categoryId
            });
        }
    )    
}