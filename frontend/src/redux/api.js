import {createAction} from '@reduxjs/toolkit'

export const apiCall = createAction('apiCall');


// get all products:
export const apiAllProducts = '/api/product';
// get products category
export const apiAllCategory = '/api';
