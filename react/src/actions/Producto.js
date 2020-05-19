import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAll = () => dispatch => {
    api.Producto().fetchAll()
        .then(response => {
            console.log(response.data);
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.Producto().create(data)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data);
    data._method = 'PUT';
    console.log(data);
    api.Producto().update(id, data)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, data, onSuccess) => dispatch => {
    data = {_method:'DELETE'};
    api.Producto().delete(id, data)
        .then(res => {    
            console.log(res.data);
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
export const Vender = (id, cantidad, onSuccess) => dispatch => {
   
   var data = {
        cantidad:cantidad,
    _method:'PUT'};
    console.log(data);
    api.Producto().update(id, data)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}