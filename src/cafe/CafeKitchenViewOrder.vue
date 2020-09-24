<template>
    <div>
        <h3>Existing orders present in menu</h3>
        <em v-if="orders.loading">Loading users...</em>
        <span v-if="orders.error" class="text-danger">ERROR: {{orders.error}}</span>
        <ul v-if="orders">
            <b>Table | Customer Name | customer Phone | Total Price | Status </b>
            <li v-for="order in orders.orders" :key="order.orderid">
                {{order.tableid + ' | ' + order.customername + ' | ' + order.customerphone + ' | ' + order.totalprice + ' | ' + order.status}}
                <ul v-if="order.orderitems">
                    <b>Item | Price | Quantity | Total | Status </b>
                    <li v-for="oi in order.orderitems" :key="oi.orderitemid">
                        {{oi.item.itemname + ' | ' + oi.item.price + ' | ' + oi.quantity + ' | ' + oi.totalprice + ' | ' + oi.status}}
                        <span> - <a @click="deliverOrderItem(oi)" class="text-danger">Deliver Item</a></span>
                        <span> - <a @click="cancelOrderItem(oi)" class="text-danger">Cancel Item</a></span>
                    </li>
                </ul>
                <span v-if="order.deleting"><em> - Deleting...</em></span>
                <span v-else-if="order.deleteError" class="text-danger"> - ERROR: {{order.deleteError}}</span>
                <span v-else>
                     - <a @click="completeOrder(order)" class="text-danger">Complete Order</a>
                     - <a @click="cancelOrder(order)" class="text-danger">Cancel Order</a>
                </span>
            </li>
        </ul>
        <p>
            <router-link to="/kitchen/orders">All Orders</router-link> |
            <router-link to="/kitchen/orders/created">Created Orders</router-link> |
            <router-link to="/kitchen/orders/completed">Completed Orders</router-link> |
            <router-link to="/kitchen/orders/cancelled">Cancelled Orders</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            orders: state => state.orders.all
        })
    },
    created () {
        const status = '';
        this.getAllOrders({status});
    },
    methods: {
        ...mapActions('orders', {
            getAllOrders: 'getAll',
            editOrder: 'editOrder',
            editOrderItem: 'editOrderItem',
            // deleteUser: 'delete'
        }),
        deliverOrderItem (oi) {
            console.log(oi);
            const status = 'DELIVERED';
            this.editOrderItem({oi, status});
            this.forceUpdateAll();
        },
        cancelOrderItem (oi) {
            console.log(oi);
            const status = 'CANCELLED';
            this.editOrderItem({oi, status});
            this.forceUpdateAll();
        },
        forceUpdateAll () {
            console.log('force-update')
            const status = '';
            this.getAllOrders({status});
        },
        completeOrder(order) {
            const status = 'COMPLETED';
            this.editOrder({ order, status });
            this.forceUpdateAll();
        },
        cancelOrder(order) {
            const status = 'CANCELLED';
            this.editOrder({ order, status });
            this.forceUpdateAll();
        },
    }
};
</script>