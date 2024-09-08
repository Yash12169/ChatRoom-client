import React from 'react';
import { configureStore } from '@reduxjs/toolkit';


const initialState = {
    friends:[],
};

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case 'SET_FRIENDS':
            return{
                ...state,
                friends:action.payload
            }
        case 'REMOVE_FRIENDS':
            return{
                ...state,
                friends: state.friends.filter((friend)=>friend.id !== action.payload),
            }
        default:
            return state;
    }
}

const rootReducer = {
    friends: reducer,
};

const Store = configureStore({
    reducer:rootReducer
});
export default Store;
