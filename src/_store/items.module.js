import { userService } from '../_services';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAllItems()
            .then(
                items => commit('getAllSuccess', items),
                error => commit('getAllFailure', error)
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
    getAllSuccess(state, itemList) {
        state.all = { items: itemList };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(item =>
            item.id === id
                ? { ...item, deleting: true }
                : item
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(item => item.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(item => {
            if (item.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...itemCopy } = item;
                // return copy of user with 'deleteError:[error]' property
                return { ...itemCopy, deleteError: error };
            }

            return item;
        })
    }
};

export const items = {
    namespaced: true,
    state,
    actions,
    mutations
};
