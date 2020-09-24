<template>
    <div>
        <div>
            <h2>Confirm Order</h2>
            <div v-if="notSubmitted">
                <h3>Existing orders present in menu</h3>
                <em v-if="orders.loading">Loading users...</em>
                <span v-if="orders.error" class="text-danger">ERROR: {{orders.error}}</span>
                <ul v-if="orders">
                    <li v-for="order in orders.orders" :key="order.orderid">
                        {{order.tableid + ' | ' + order.customername + ' | ' + order.customerphone + ' | ' + order.totalprice + ' | ' + order.status}}
                        <ul v-if="order.orderitems">
                            <li v-for="oi in order.orderitems" :key="oi.orderitemid">
                                {{oi.item.itemname + ' | ' + oi.item.price + ' | ' + oi.quantity + ' | ' + oi.totalprice + ' | ' + oi.status}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div v-else>
                <h4>Enter Phone number to view active orders.</h4>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="customerphone">Customer Phone</label>
                        <input type="text" v-model="customerphone" v-validate="'required'" name="customerphone" class="form-control" :class="{ 'is-invalid': submitted && errors.has('customerphone') }" />
                        <div v-if="submitted && errors.has('customerphone')" class="invalid-feedback">{{ errors.first('customerphone') }}</div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" :disabled="status.registering">Confirm Details</button>
                        <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            customerphone: '',
            submitted: false,
            totalPrice: 0,
            notSubmitted: '',
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            orders: state => state.orders.all
        })
    },
    created () {
        const status = 'CREATED';
        // if (this.customerphone) this.getAllOrders({ status, customerphone: this.customerphone });
    },
    methods: {
        ...mapActions('orders', {
            getAllOrders: 'getAll',
            editOrder: 'editOrder',
            editOrderItem: 'editOrderItem',
            // deleteUser: 'delete'
        }),
        handleSubmit(e) {
            this.submitted = true;
            this.notSubmitted = this.customerphone;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.forceUpdateAll();
                }
            });
        },
        forceUpdateAll () {
            console.log('force-update')
            const status = 'CREATED';
            this.getAllOrders({ status, customerphone: this.customerphone });
        },
    }
};
</script>