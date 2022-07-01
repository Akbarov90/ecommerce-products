import axios from 'axios'

const middleware =
    ({dispatch}) =>
        next =>
            action => {

                if (action.type !== 'apiCall') {
                    next(action)
                    return
                }

                next(action)


                const {method, url, params, data, onStart, onSuccess, onFail} = action.payload


                dispatch({type: onStart})
                // debugger
                axios({
                    baseURL: ' http://localhost:3001',
                    method,
                    data,
                    url,
                    params,
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            // console.log(res)
                            dispatch({
                                type: onSuccess,
                                payload: res.data,
                            })
                        } else {
                            dispatch({
                                type: onFail,
                                payload: res,
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error, 12)
                        dispatch({
                            type: onFail,
                            payload: error,
                        })
                    })
            }

export default middleware
