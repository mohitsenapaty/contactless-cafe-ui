import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    createItem,
    getAllItems,
    createOrder,
    getAllOrders,
    editOrder,
    editOrderItem,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function createItem(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    return fetch(`${config.apiUrl}/api/v1/item/`, requestOptions).then(handleResponse);
}

function getAllItems() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${config.apiUrl}/api/v1/item/`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data.data;
        });
}

function createOrder(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    return fetch(`${config.apiUrl}/api/v1/order/`, requestOptions).then(handleResponse);
}

function getAllOrders(params) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    let paramStr = `?`;
    if (params){
        paramStr += (params.status) ? `status=${params.status}`: ``;
        paramStr += (params.customerphone) ? `&customerphone=${params.customerphone}`: ``;
    }
    return fetch(`${config.apiUrl}/api/v1/order/${paramStr}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data.data;
        });
}

function editOrder(order, status) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    };
    return fetch(`${config.apiUrl}/api/v1/order/${order.orderid}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data.data;
        });
}

function editOrderItem(oi, status) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    };
    console.log(requestOptions);
    return fetch(`${config.apiUrl}/api/v1/order/${oi.orderid}/orderitems/${oi.orderitemid}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data);
            return data.data;
        });
}
