import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        try {
            const json =  await axios.get('http://localhost:3001/dogs');
            return dispatch ({
                type: 'GET_DOGS',
                payload: json.data
            })
        } catch (error) {
            alert(error)
        }
    }
}

export function orederByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPeso(payload){
    return {
        type: 'ORDER_BY_PESO',
        payload
    }
}

export function orderByRaza(payload){
    return {
        type: 'ORDER_BY_RAZA',
        payload
    }
}

export const searchDogByName = (name) =>{
    return async function(dispatch){
        try {
            const nameDog = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({type: 'SEARCH_BY_NAME', payload:nameDog.data})
        } catch (error) {
            alert('No se encontro perro')
        }
    }
}

export function filterByTemperament(payload){
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export const getCardDetail = (id) =>{
    return async function(dispatch){
        try {
            const idDog = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({type: 'GET_CARD_DETAIL', payload:idDog.data})
        } catch (error) {
            alert(error)
        }
    }
}

export const getAllTemperament = () =>{
    return async function(dispatch){
        try {
            const temperament = await axios.get('http://localhost:3001/temperament')
            return dispatch({type:'GET_ALL_TEMPERAMENT', payload:temperament.data})
        } catch (error) {
            alert(error)
        }
    }
}

export const clearLoad = () =>{
    return function(dispatch){
        return dispatch({type:'CLEAR_LOAD'})
    }
}

export function postDog(payload){
    return async function(dispatch){
        try {
            await axios.post('http://localhost:3001/dog', payload)
            return dispatch({type:'POST_DOG'})
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export function deleteDog(id){
    return async function(dispatch){
           let deleteDog =  await axios.delete(`http://localhost:3001/delete/${id}`)
            return dispatch({type:'DELETE_DOG' , payload:deleteDog})
    }
}
