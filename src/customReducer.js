export function customReducer(state, action){
    switch (action.type){
        case 'loadedCats': 
            return action.loadedCats;
        case 'loadCats': 
            return action.loadCats;
        default: 
            break;
    }
}