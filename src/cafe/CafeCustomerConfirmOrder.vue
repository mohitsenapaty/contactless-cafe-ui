<template>
    <div>
        <div>
            <h2>Confirm Order</h2>
            <h4>Table ID: {{ $route.params.tableid }} </h4>
            <h4>Customer Name: {{ $route.params.customername }} </h4>
            <h4>Customer Phone: {{ $route.params.customerphone }} </h4>
            <form @submit.prevent="handleSubmit">
                <h6>Order items selected: </h6>
                <ul v-if="order.items">
                    <li v-for="item in order.items" :key="item.itemid">
                        {{item.itemname + ' | ' + item.quantity}}
                    </li>
                </ul>
                <h6>Total Price: {{ totalPrice }} </h6>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="status.registering">Confirm Order</button>
                    <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    <router-link to="/login" class="btn btn-link">Cancel</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            order: {
                customername: '',
                customerphone: '',
                description: '',
                tableid: '',
                picurl: '',
                items: [],
            },
            submitted: false,
            totalPrice: 0,
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            items: state => state.items.all
        }),
        catagoryGroup: function() {
            return this.catagorise();
        },
    },
    created () {
        this.getAllItems();
        this.order.tableid = this.$route.params.tableid;
        this.order.customername = this.$route.params.customername;
        this.order.customerphone = this.$route.params.customerphone;
        this.order.items = this.$route.params.items;
        this.totalPrice = this.$route.params.totalPrice;
    },
    methods: {
        ...mapActions('account', ['createOrder']),
        ...mapActions('items', {
            getAllItems: 'getAll',
            // deleteUser: 'delete'
        }),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.createOrder(this.order);
                }
            });
        },
        addItemToOrder(item) {
            // add item to order if not present or increase order by 1 if present
            let itemFound = false;
            for (var i=0; i < this.order.items.length; i++) {
                if (this.order.items[i].itemid === item.itemid) {
                    // object present earlier
                    this.order.items[i].quantity += 1;
                    itemFound = true;
                }
            }
            if (!itemFound) {
                this.order.items.push({
                    itemid: item.itemid,
                    quantity: 1,
                    itemname: item.itemname,
                    price: item.price,
                });
            }
            this.totalPrice += item.price;
        },
        removeItemFromOrder(itemid) {
            // remove item from order if quantity is 0 or remove 1 item from quantity
            for (var i=0; i < this.order.items.length; i++) {
                if (this.order.items[i].itemid === itemid) {
                    // object present earlier
                    this.order.items[i].quantity -= 1;
                    this.totalPrice -= this.order.items[i].price;
                }
                if (this.order.items[i].quantity === 0) {
                    this.order.items.splice(i, 1);
                }
            }
        },
        groupByCat(collection) {
            var i = 0, val, key, result = {};
            if (!collection) {
                return;
            }
            for (; i < collection.length; i++) {
                key = collection[i].catagory;
                val = collection[i];
                if (!result[key]) {
                    result[key] = [val];
                } else {
                    result[key].push(val);
                }
            }
            return result;
        },
        catagorise() {
            // groupby catagory
            return this.groupByCat(this.items.items);
        },
        confirmOrder() {
            const orderParams = {
                tableid: this.order.tableid,
                customername: this.order.customername,
                customerphone: this.order.customerphone,
                items: this.order.items,
            }
            this.$router.push({ name: 'RegisterPage', params: {title: 'test title', orderParams }})
        },
    }
};
</script>