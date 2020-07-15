const initState = [];

export default function reducer(state = initState, action) {
    switch(action.type) {
        case "GET_DATA":
            return state = action.data;
    }
    return state;
}