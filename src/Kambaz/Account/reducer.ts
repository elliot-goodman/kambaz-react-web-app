import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  currentUser: null,
  enrollments: [],
};
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      if (action.payload) {
        state.enrollments = state.enrollments.filter(
          (e: any) => e.user === action.payload?._id
        );
      }
    },
    enrollUser: (state, { payload: courseId }) => {
      if (state.currentUser !== null) {
        const newEnrollment: any = {
          _id: uuidv4(),
          user: state.currentUser['_id'],
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
      }
    },
    unenrollUser: (state, { payload: courseId }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e.course === courseId
      );
    },
  },
});
export const { setEnrollments, setCurrentUser, enrollUser, unenrollUser } =
  accountSlice.actions;
export default accountSlice.reducer;
