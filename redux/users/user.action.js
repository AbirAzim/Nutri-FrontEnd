export const setActiveUser = (value) => {
    return async(dispatch) => {
        
        dispatch({
            type: 'SET_USER',
            payload: value
        })
    }
}