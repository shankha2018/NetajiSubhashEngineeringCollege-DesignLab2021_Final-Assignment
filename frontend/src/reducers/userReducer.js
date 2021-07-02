export const initialState = null;

export const reducer = (state, action)=>{
    if(action.type === "USER"){
        return action.payload;
    }
    if(action.type === "CLEAR"){
        return null;
    }
    if(action.type === "UPDATE"){
        return {
            ...state
        };
    }
    if(action.type === "UPDATEPIC"){
        return {
            ...state,
            pic: action.payload.pic
        };
    }
    if(action.type === "UPDATENAME"){
        return {
            ...state,
            name: action.payload.name
        };
    }
    if(action.type === "UPDATEPHONE"){
        return {
            ...state,
            phone: action.payload.phone
        };
    }
    return state;
}