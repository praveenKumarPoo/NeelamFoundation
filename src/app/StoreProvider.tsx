'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../lib/store'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {

    return (<PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            {children}
        </Provider>
    </PersistGate>)
}