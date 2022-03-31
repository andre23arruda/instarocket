
const BASE_URL = process.env.REACT_APP_API_URL


function getApi(route, auth='') {
    let response_status = 400
    return fetch(
        BASE_URL + route,
        {
            headers: new Headers({
                Authorization: auth,
            })
        }
    )
    .then(response => {
        response_status = response.status
        return response.json()
    })
    .then(data => {
        return {data, response_status}
    })
}


async function patchApi(route, formData, auth='') {
    return fetch(
        BASE_URL + route,
        {
            credentials: 'same-origin',
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Authorization': auth,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        }
    )
    .then(response => response.json())
}

async function postApi(route, formData, token='') {
    let response_status = 400
    return fetch(
        BASE_URL + route,
        {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        }
    )
    .then(response => {
        response_status = response.status
        return response.json()
    })
    .then(data => {
        return {data, response_status}
    })
}


async function postFormDataApi(route, data, auth='') {
    let response_status = 400
    const formData = new FormData()
    for (let prop in data) {
        formData.append(prop, data[prop])
    }
    // console.log(auth)
    return fetch(
        BASE_URL + route,
        {
            credentials: 'same-origin',
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': auth,
            })
        }
    )
    .then(response => {
        response_status = response.status
        return response.json()
    })
    .then(data => {
        return {data, response_status}
    })
}

async function googleLogin(accesstoken) {
    const { data } = await postApi(
        'rest-auth/google/',
        { access_token: accesstoken }
    )
    // console.log(data)
    return data
}



export { getApi, patchApi, postApi, postFormDataApi, googleLogin }