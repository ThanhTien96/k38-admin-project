

const initialState = {
    listShoe: [],
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_LIST_SHOE":
            return {...state, listShoe: action.payload};
        default:
            return state;
    }
}


export default reducer;