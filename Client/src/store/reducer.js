import { combineReducers } from '@reduxjs/toolkit';
import ownerReducer from '../slice/ownerSlice'; // Corrected path and import
import { adminReducer,managerReducer, employeeReducer } from '../slice/entity/entitySlice';
import customizationReducer from './customizationReducer';
import authReducer  from '../slice/authSlice';
import {productCategoryReducer,productReducer}  from '../slice/product/productSlice';
import { companiesReducer, peopleReducer, customerReducer } from '../slice/application/applicationSlice';

export default combineReducers({
    admin: adminReducer,
    manager: managerReducer,
    productCategory : productCategoryReducer,
    product : productReducer,
    employee: employeeReducer,
    owner: ownerReducer,
    companies: companiesReducer,
    people: peopleReducer,
    customer: customerReducer,
    customization: customizationReducer,
    auth: authReducer
});

