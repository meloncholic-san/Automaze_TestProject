import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: '',
  status: 'all',
  sort: 'priority_asc',
  category: '',
  page: 1,
  limit: 10,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    resetFilters() {
      return initialState;
    }
  },
});

export const {
  setSearch,
  setStatus,
  setSort,
  setCategory,
  setPage,
  setLimit,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
