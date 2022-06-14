
const initialState = {
    raza : [],
    razaCopia:[],
    detail:[],
    temperamentState:[],
}


function rootReducer(state = initialState,action){
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                raza: action.payload,
                razaCopia: action.payload
            }
        case 'ORDER_BY_NAME':
            let razaFiltradoName = action.payload === 'asc'?
            state.raza.sort(function(a,b){
                if (a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }):
            state.raza.sort(function(a,b){
                if(a.name > b.name){
                    return -1
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                raza: razaFiltradoName
            }
            case 'ORDER_BY_PESO':
              
                let razaFiltradoPeso = action.payload === 'asc'?
                state.raza.sort(function(a,b){
                    if (a.pesoMax > b.pesoMax){
                        return 1;
                    }
                    if(b.pesoMax > a.pesoMax){
                        return -1
                    }
                    return 0
                }):
                state.raza.sort(function(a,b){
                    if(a.pesoMax > b.pesoMax){
                        return -1
                    }
                    if (b.pesoMax > a.pesoMax){
                        return 1;
                    }
                    return 0
                })
                return {
                    ...state,
                    raza: razaFiltradoPeso
                }
            case 'ORDER_BY_RAZA':
                if(action.payload === 'todos'){
                    return {
                        ...state,
                        raza: state.razaCopia
                }}
                let filterApi;
                if(action.payload === 'api'){
                    filterApi = state.razaCopia.filter( e => e.id <= 300)
                }
                
                if(action.payload === 'creados'){
                    filterApi = state.razaCopia.filter( e => e.id.length > 6)
                }
                return {
                    ...state,
                    raza: filterApi
                }
            case 'SEARCH_BY_NAME':
                return {
                    ...state,
                    raza : action.payload
                }
            case 'FILTER_BY_TEMPERAMENT':
                const razaTotal = state.razaCopia;
                // const filtradosTemperament = action.payload === 'todos' ? razaTotal : razaTotal.filter(e => e.temperament === action.payload)
                for (let i = 0; i < razaTotal.length; i++) {
                    
                    var filtradosTemperament =razaTotal.filter(e => e.temperament.includes(action.payload))
                
                }
                return{
                    ...state,
                    raza: action.payload === 'todos' ? razaTotal : filtradosTemperament
                }
            case 'GET_CARD_DETAIL':
                return {
                    ...state,
                    detail:action.payload
                }
            case 'GET_ALL_TEMPERAMENT':
                return {
                    ...state,
                    temperamentState: action.payload
                }
            case 'CLEAR_LOAD':
                return {
                    ...state,
                    detail:[]
                }
            case 'POST_DOG':
                return {
                    ...state
                }
            case 'DELETE_DOG':
                return state  
        default:
            return state;
    }
}



export default rootReducer;