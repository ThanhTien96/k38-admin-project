

const initialState = {
    appTitle: "",
    pageLoading: false,
};

export const appReducerContants = {
    UPDATE_APP_TITLE: "UPDATE_APP_TITLE",
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case appReducerContants.UPDATE_APP_TITLE:
            const newState = {...state, appTitle: action.payload}
            return newState
        default:
            return state;
    }
}

export default appReducer;

