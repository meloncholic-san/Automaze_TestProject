import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setStatus, setSort, setCategory, resetFilters  } from '../../redux/filters/slice';
import {
  selectSearch,
  selectStatus,
  selectSort,
  selectCategory,
} from '../../redux/filters/selectors';

import { useCallback, useRef  } from 'react';
import debounce from 'lodash/debounce';

const CATEGORY_OPTIONS = {
  WORK: 'work',
  HOME: 'home',
  PERSONAL: 'personal',
  STUDY: 'study',
  SHOPPING: 'shopping',
  FITNESS: 'fitness',
  FINANCE: 'finance',
  FAMILY: 'family',
  HOBBY: 'hobby',
  TRAVEL: 'travel',
};

export default function TaskFilters() {
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);
  const status = useSelector(selectStatus);
  const sort = useSelector(selectSort);
  const category = useSelector(selectCategory);
  const inputRef = useRef(null);

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value);
  };

 return (
    <div className="mb-6 p-3 border bg-white border-gray-300 rounded-md shadow-sm flex flex-col gap-3">
      {/* Search + Filters */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* Search */}
        <div className="relative w-full max-w-sm flex-shrink-0">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tasks..."
            defaultValue={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {/* Status */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => dispatch(setStatus(e.target.value))}
              className="appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm bg-white cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="done">Done</option>
              <option value="undone">Undone</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className="appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm bg-white cursor-pointer"
            >
              <option value="priority_asc">Priority Ascending</option>
              <option value="priority_desc">Priority Descending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm bg-white cursor-pointer"
            >
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_OPTIONS).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-start">
        <button
          onClick={() => {
            dispatch(resetFilters());
            debouncedSetSearch.cancel(); 
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
          className="px-3 py-1 text-xs border rounded-md bg-gray-100 hover:bg-gray-200 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  ); 
  
}
