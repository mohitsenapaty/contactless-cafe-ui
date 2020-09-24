import { userService } from '../_services';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }, status) {
        commit('getAllRequest');

        userService.getAllOrders(status)
            .then(
                items => commit('getAllSuccess', items),
                error => commit('getAllFailure', error)
            );
    },

    editOrder({ commit }, {order, status}) {
        commit('editOrderRequest', {o: order, s: status});

        userService.editOrder(order, status)
            .then(
                oi => commit('editOrderSuccess', {o: order, s: status}),
                error => commit('editOrderFailure', { order, error: error.toString() })
            );
    },

    editOrderItem({ commit }, {oi, status}) {
        commit('editOrderItemRequest', { oi, status});

        userService.editOrderItem(oi, status)
            .then(
                oi => commit('editOrderItemSuccess', { oi, status}),
                error => commit('editOrderItemFailure', { oi, error: error.toString() })
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, orderList) {
        state.all = { orders: orderList };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.orders = state.all.orders.map(order =>
            order.id === id
                ? { ...order, deleting: true }
                : order
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.orders = state.all.orders.filter(order => order.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.orders = state.orders.map(order => {
            if (order.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...orderCopy } = order;
                // return copy of user with 'deleteError:[error]' property
                return { ...orderCopy, deleteError: error };
            }

            return order;
        })
    },
    editOrderRequest(state, {o, s}) {
        // add 'deleting:true' property to user being deleted
        state.all.orders = state.all.orders.map(order =>
            order.id === o.id
                ? { ...order, changing: true }
                : order
        )
    },
    editOrderSuccess(state, { o, s}) {
        // remove deleted user from state
        // state.all.orders = state.all.orders.filter(order => order.id !== o.id)
        if (state.all && state.all.orders) {
            state.all.orders = state.all.orders.map(order => {
                if (order.id === o.id) {
                    order.status = s;
                }
                return order;
            });
        }
    },
    editOrderFailure(state, { o, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.orders = state.orders.map(order => {
            if (order.id === o.id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...orderCopy } = order;
                // return copy of user with 'deleteError:[error]' property
                return { ...orderCopy, deleteError: error };
            }

            return order;
        })
    },
    editOrderItemRequest(state, {o, s}) {},
    editOrderItemSuccess(state, {o, s}) {},
    editOrderItemFailure(state, {o, s}) {},
};

export const orders = {
    namespaced: true,
    state,
    actions,
    mutations
};
