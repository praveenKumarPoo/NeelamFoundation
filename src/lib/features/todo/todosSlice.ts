'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    value: Array<{}>
    workFlowData: Array<{
        components: [],
        id: Number,
        title: string
    }>
}

const initialState: CounterState = {
    value: [],
    workFlowData: [
        {
            id: 0,
            title: "Order Taken",
            components: [
            ]
        },
        {
            id: 1,
            title: "Kitchen inprogress",
            components: [
            ]
        },
        {
            id: 2,
            title: "Order Ready",
            components: [
            ]
        }

    ]

}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => { state.value },
        decrement: (state) => { state.value },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        updateCartOrder: (state, action) => {
            console.log(action.payload)
            state.value = [...state.value, action.payload];
        },
        createOrder: (state, action) => {
            state.workFlowData[0]['components'] = action.payload
        },
        updateOrder: (state, action) => {
            state.workFlowData = action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount, updateCartOrder, createOrder, updateOrder } = counterSlice.actions;

export default counterSlice.reducer;