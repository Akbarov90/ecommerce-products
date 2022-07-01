import {createSlice} from "@reduxjs/toolkit";
import {apiCall, apiAllProducts, apiAllCategory} from "../api";


const Products = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        productsData: [],
        product: [],
        dataProducts: '',
        categoryProducts: [],
        count: ''
    },
    reducers: {
        onGetStart: (state) => {
            state.loading = true
        },
        onFail: (state, action) => {
            state.loading = false
            state.dataProducts = action.payload
        },
        getProductsSuccess: (state, action) => {
            state.loading = false
            state.productsData = action.payload.products
            state.count = action.payload.count
            // console.log(state.productsData)
            state.productsData.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
        },
        getProductSuccess: (state, action) => {
            state.loading = false
            state.product = action.payload
        },
        getCategorySuccess: (state, action) => {
            state.loading = false
            state.categoryProducts = action.payload
        },
        filterProducts: (state, {payload}) => {
            state.loading = false
            state.productsData = payload.products
            state.count = payload.count
        }
    }
})

//get all products action
export const getProducts = (params) => apiCall({
    url: apiAllProducts,
    method: 'get',
    params,
    onStart: Products.actions.onGetStart.type,
    onSuccess: Products.actions.getProductsSuccess.type,
    onFail: Products.actions.onFail.type
})

// getting a single product action
export const getProduct = (id) => apiCall({
    url: `${apiAllProducts}/` + id,
    method: 'get',
    onStart: Products.actions.onGetStart.type,
    onSuccess: Products.actions.getProductSuccess.type,
    onFail: Products.actions.onFail.type
})

// getting products category
export const getCategory = () => apiCall({
    url: apiAllCategory + '/category',
    method: 'get',
    onStart: Products.actions.onGetStart.type,
    onSuccess: Products.actions.getCategorySuccess.type,
    onFail: Products.actions.onFail.type
})

// filtering products
export const filterProducts = (params) => apiCall({
    url: apiAllProducts,
    method: 'get',
    params,
    onStart: Products.actions.onGetStart.type,
    onSuccess: Products.actions.filterProducts.type,
    onFail: Products.actions.onFail.type
})



export default Products.reducer