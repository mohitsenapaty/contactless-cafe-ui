<template>
    <div>
        <h2>Enter menu items</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="itemname">Item Name</label>
                <input type="text" v-model="item.itemname" v-validate="'required'" name="itemname" class="form-control" :class="{ 'is-invalid': submitted && errors.has('itemname') }" />
                <div v-if="submitted && errors.has('itemname')" class="invalid-feedback">{{ errors.first('itemname') }}</div>
            </div>
            <div class="form-group">
                <label for="price">Item Price</label>
                <input type="text" v-model="item.price" v-validate="'required'" name="price" class="form-control" :class="{ 'is-invalid': submitted && errors.has('price') }" />
                <div v-if="submitted && errors.has('price')" class="invalid-feedback">{{ errors.first('price') }}</div>
            </div>
            <div class="form-group">
                <label for="description">Item Description</label>
                <input type="text" v-model="item.description" v-validate="'required'" name="description" class="form-control" :class="{ 'is-invalid': submitted && errors.has('description') }" />
                <div v-if="submitted && errors.has('description')" class="invalid-feedback">{{ errors.first('description') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="picurl">Url photo</label>
                <input type="picurl" v-model="item.picurl" v-validate="{ required: true, min: 6 }" name="picurl" class="form-control" :class="{ 'is-invalid': submitted && errors.has('picurl') }" />
                <div v-if="submitted && errors.has('picurl')" class="invalid-feedback">{{ errors.first('picurl') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="catagory">Catagory</label>
                <input type="catagory" v-model="item.catagory" v-validate="{ required: true, min: 1 }" name="catagory" class="form-control" :class="{ 'is-invalid': submitted && errors.has('catagory') }" />
                <div v-if="submitted && errors.has('catagory')" class="invalid-feedback">{{ errors.first('catagory') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Register</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            item: {
                itemname: '',
                price: '',
                description: '',
                picurl: '',
                catagory: '',
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['createItem']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.createItem(this.item);
                }
            });
        }
    }
};
</script>