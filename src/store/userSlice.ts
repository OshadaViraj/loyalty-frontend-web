import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { TUser } from "./user.type";
import { TUserPoint } from "./userpoints.type";
import { toast } from "react-toastify";

const BASEURL = "http://localhost:8080/api";

export interface UserState {
  users: Array<TUser>;
  selectedUser: TUser | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  status: "idle",
};

export const createNewUser = createAsyncThunk(
  "user/createUser",
  async (user: TUser): Promise<TUser> => {
     const response = await axios.post(`${BASEURL}/customer`, user );
     const userData = response.data;

    const newUser: TUser = {
      id: userData.id,
      mobileNumber: userData.mobileNumber,
      firstName: userData.firstName,
      address: userData.address,
      middleName: userData.middleName,
      lastName: userData.lastName,
      totalPoints: userData.totalPoints
    };

    return newUser;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: TUser): Promise<TUser> => {
     const response = await axios.put(`${BASEURL}/customer`, user );
     const userData = response.data;

    const newUser: TUser = {
      id: userData.id,
      mobileNumber: userData.mobileNumber,
      firstName: userData.firstName,
      address: userData.address,
      middleName: userData.middleName,
      lastName: userData.lastName,
      totalPoints: userData.totalPoints
    };

    return newUser;
  }
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (): Promise<Array<TUser>> => {    
     const response = await axios.get(`${BASEURL}/customer`);
    const userData = response.data;
    const users: Array<TUser> = userData.map((user: any) => ({
      id: user.id,
      mobileNumber: user.mobileNumber,
      firstName: user.firstName,
      address: user.address,
      middleName: user.middleName,
      lastName: user.lastName,
      totalPoints: user.totalPoints
    }));

    return users;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId: number): Promise<TUser> => {
    // const response = await axios.post('/TODO:url here', user);
    return {
      id: 1,
      mobileNumber: "",
      firstName: "123 321",
      address: "string",
      middleName: "string",
      lastName: "string",
      totalPoints: 0
    };
  }
);

export const addPointsByUserId = createAsyncThunk(
  "user/addPoints",
  async (userPoint: TUserPoint): Promise<TUser> => {
    const response = await axios.post(`${BASEURL}/loyalty-point/add`, userPoint );
    const userData = response.data;

   const newUser: TUser = {
     id: userData.id,
     mobileNumber: userData.mobileNumber,
     firstName: userData.firstName,
     address: userData.address,
     middleName: userData.middleName,
     lastName: userData.lastName,
     totalPoints: userData.totalPoints
   };

   return newUser;
 }
);

export const redeemPointsByUserId = createAsyncThunk(
  "user/redeemPoints",
  async (userPoint: TUserPoint): Promise<TUser> => {
    const response = await axios.post(`${BASEURL}/loyalty-point/redeem`, userPoint );
    const userData = response.data;

   const newUser: TUser = {
     id: userData.id,
     mobileNumber: userData.mobileNumber,
     firstName: userData.firstName,
     address: userData.address,
     middleName: userData.middleName,
     lastName: userData.lastName,
     totalPoints: userData.totalPoints
   };

   return newUser;
 }
);

export const viewAllPoints = createAsyncThunk(
  'user/viewAllPoints',
  async (mobileNumber: string): Promise<Array<TUserPoint>> => {
    const response = await axios.get(`${BASEURL}/loyalty-point/{mobileNumber}`, );

    const responseData = response.data;
    const userPoints = responseData.map((userPointData: any) => {
      const { id, mobileNumber, loyaltyPoint, productId, createdDate } = userPointData;
      return { id, mobileNumber, loyaltyPoint, productId, createdDate };
    });

    return userPoints;
  });


export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.status = "idle";
        if (!action?.payload) {
          toast.error(`Error on creating User`);
          return;
        }
        const oldUsers = state.users;
        oldUsers.push(action.payload);
        state.users = oldUsers;
        toast.success(`Added a new user`);
      })
      .addCase(createNewUser.rejected, (state) => {
        state.status = "failed";
        toast.error(`Error on redeeming user points`);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {        
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addPointsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPointsByUserId.fulfilled, (state, action) => {
        state.status = "idle";
        if (!action?.payload) {
          toast.error(`Could not add points`);
          return;
        }
        const { id } = action.payload;
        const userIndex = state.users.findIndex((user) => user.id === id);
        const oldUsers = state.users;
        oldUsers[userIndex] = action.payload;
        state.users = oldUsers;
        toast.success(`Added user points`);
      })
      .addCase(addPointsByUserId.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(redeemPointsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(redeemPointsByUserId.fulfilled, (state, action) => {
        state.status = "idle";
        if (!action?.payload) {
          toast.error(`Error on redeeming user points`);
          return;
        }
        const { id } = action.payload;
        const userIndex = state.users.findIndex((user) => user.id === id);
        const oldUsers = state.users;
        oldUsers[userIndex] = action.payload;
        state.users = oldUsers;
      })
      .addCase(redeemPointsByUserId.rejected, (state) => {
        state.status = "failed";
        toast.error(`Error on redeeming user points`);
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
