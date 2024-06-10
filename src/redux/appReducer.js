

const initialState = {
    appTitle: "",
    appLoading: false,
};

export const APP_REDUCER_TYPE = {
    updateAppTitle: "UPDATE_APP_TITLE",
    updateAppLoading: "UPDATE_APP_LOADING"
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case APP_REDUCER_TYPE.updateAppTitle:
            const newState = {...state, appTitle: action.payload}
            return newState
        case APP_REDUCER_TYPE.updateAppLoading:
            return {...state, appLoading: action.payload}
        default:
            return state;
    }
}

export default appReducer;

