

const initialState = {
    listShoe: [],
    shoeDetail: null,
    error: null,
}


export const PRODUCT_REDUCER_TYPE = {
    updateListShoe: "UPDATE_LIST_SHOE",
    updateShoeDetail: "UPDATE_SHOE_DETAIL",
    updateError: "UPDATE_ERROR",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REDUCER_TYPE.updateListShoe:
            return {...state, listShoe: action.payload};
        case PRODUCT_REDUCER_TYPE.updateShoeDetail:
            const newState = {...state, shoeDetail: action.payload}
            return newState
        case PRODUCT_REDUCER_TYPE.updateError:
            return {...state, error: action.payload}
        default:
            return state;
    }
}


export default reducer;