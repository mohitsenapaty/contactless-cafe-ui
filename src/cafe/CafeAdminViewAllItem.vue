<template>
    <div>
        <h3>Existing items present in menu</h3>
        <em v-if="items.loading">Loading users...</em>
        <span v-if="items.error" class="text-danger">ERROR: {{items.error}}</span>
        <ul v-if="items">
            <li v-for="item in items.items" :key="item.itemid">
                {{item.itemname + ' | ' + item.price + ' | ' + item.description + ' | ' + item.picurl}}
                <span v-if="item.deleting"><em> - Deleting...</em></span>
                <span v-else-if="item.deleteError" class="text-danger"> - ERROR: {{item.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(item.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminViewItems',
    computed: {
        ...mapState({
            items: state => state.items.all
        })
    },
    created () {
        this.getAllItems();
    },
    methods: {
        ...mapActions('items', {
            getAllItems: 'getAll',
            // deleteUser: 'delete'
        })
    }
};
</script>