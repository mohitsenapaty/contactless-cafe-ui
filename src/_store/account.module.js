import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    createItem({ dispatch, commit }, item) {
        commit('createItem', item);

        userService.createItem(item)
            .then(
                item => {
                    commit('itemCreationSuccess', item);
                    router.push('/admin/items');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Item creation successful', { root: true });
                    })
                },
                error => {
                    commit('itemCreationFailure', error);
                    dispatch('alert/error', error, { root: true });
                },
            );
    },
    createOrder({ dispatch, commit }, order) {
        commit('createOrder', order);

        userService.createOrder(order)
            .then(
                item => {
                    commit('orderCreationSuccess', order);
                    router.push('/customer/orders');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Order creation successful', { root: true });
                    })
                },
                error => {
                    commit('orderCreationFailure', error);
                    dispatch('alert/error', error, { root: true });
                },
            );
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    },
    createItem(state, item) {
        state.status = { registering: true };
    },
    itemCreationSuccess(state, item) {
        state.status = {};
    },
    itemCreationFailure(state, item) {
        state.status = {};
    },
    createOrder(state, order) {
        state.status = { registering: true };
    },
    orderCreationSuccess(state, order) {
        state.status = {};
    },
    orderCreationFailure(state, order) {
        state.status = {};
    },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};