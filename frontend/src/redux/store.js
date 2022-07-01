import {configureStore} from '@reduxjs/toolkit'
import middleware from "./middleware";

import Products from './products/productSlice';

export default configureStore({
    reducer: {Products},
    middleware: [middleware],
})