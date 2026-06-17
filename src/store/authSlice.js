import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
};


const authSlice = createSlice({ 
    name: 'auth',    
    initialState, 
    reducers: {        
        login: (state, action) => {            
            state.status = true;            
            const payload = action.payload?.userData ?? action.payload;
            state.userData = payload && typeof payload === 'object'
                ? JSON.parse(JSON.stringify(payload))
                : payload;
        },        
        logout: (state) => {            
            state.status = false;            
            state.userData = null;            
        },        
    },    
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;