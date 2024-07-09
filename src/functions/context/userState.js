// import { createSlice } from '@reduxjs/toolkit';

import { Children, useContext, useState } from "react";
import { createContext } from "react"
// export const usersSlice = createSlice({
//   name: 'user',
//   initialState: {
//     currentUser: null
//   },
//   reducers: {
//     setUser: (users, action) => {
//         users.currentUser = action.payload;
//     },
//   }
// })

// export const { setUser } = usersSlice.actions;

// export const selectUsers = state => state.users;

// export default usersSlice.reducer;

export const user = createContext();
// const UserState = () => {
//     const [CurrentUser , SetCurrentUser] = useState(false);

//     <user.Provider value={[CurrentUser, SetCurrentUser]}>
//         {Children}
//     </user.Provider>
// }
export default user;
// export default UserState;

