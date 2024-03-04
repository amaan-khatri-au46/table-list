import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from '../../services/apiService';

interface TableItem {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  _id: string;
}

interface TableState {
  data: TableItem[];
  editItem: any;
  openForm: boolean;
  loading: boolean;
  editRow :any
  deleteRow : any
  openDelete: boolean
}

const initialState: TableState = {
  loading: false,
  openForm : false,
  data: [],
  editItem: [],
  editRow : [],
  deleteRow : [],
  openDelete : false,
};

export const fetchTable = createAsyncThunk(
  'table/fetchTable',
  async () => {
    try {
      const response = await apiService.get('/item');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addTableItem = createAsyncThunk(
  'table/addTableItem',
  async (item: TableItem, { dispatch }) => {
    try {
      console.log("Item ")
      await apiService.post('/item', item);
      dispatch(fetchTable());
    } catch (error) {
      throw error;
    }
  }
);

export const editTableItem = createAsyncThunk(
  'table/editTableItem',
  async ({ id, item }: { id: string, item: TableItem }, { dispatch }) => {
    try {
      await apiService.put(`/item/${id}`, item);
      dispatch(fetchTable());
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTableItem = createAsyncThunk(
  "table/deleteTableItem",
  async (id: string, { dispatch }) => {
    try {
      await apiService.delete(`/item/${id}`);
      dispatch(fetchTable());
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = async (userData: any) => {
  try {
    const response = await apiService.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login a user
export const loginUser = async (userData: any) => {
  try {
    const response = await apiService.post('/login', userData);
    const token = response.data.token; 
    localStorage.setItem('token', token); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

const tableSlice = createSlice({
  name: 'tableList',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEditItem: (state, action) => {
      state.editItem = action.payload;
    },
    setOpenFrom:(state, action ) => {
        state.openForm = action.payload
    },
    setEditRow: (state, action) => {
        state.editRow = action.payload
    },
    setDeleteRow : (state, action) => {
        state.deleteRow = action.payload
    },
    openDeleteDailog : (state , action) => {
        state.openDelete = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTable.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setLoading, setEditItem, setOpenFrom , setEditRow , setDeleteRow , openDeleteDailog} = tableSlice.actions;
export default tableSlice.reducer;
