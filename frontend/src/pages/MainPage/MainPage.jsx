import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchTasks, createTask, updateTask, deleteTask } from '../../redux/tasks/operations';
import { selectAllTasks } from '../../redux/tasks/selectors';

import {
  selectSearch,
  selectStatus,
  selectSort,
  selectFilters,
  selectCategory,
} from '../../redux/filters/selectors'
import {
  setSearch,
  setStatus,
  setSort,
  setCategory,
} from '../../redux/filters/slice';


import TaskCreateForm from '../../components/TaskCreateForm/TaskCreateForm.jsx';
import TaskFilters from '../../components/TaskFilters/TaskFilters.jsx';
import TaskList from '..//../components/TaskList/TaskList.jsx';
import { selectTaskLoading } from '../../redux/tasks/selectors';



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MainPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const filters = useSelector(selectFilters);
  const isLoading = useSelector(selectTaskLoading);
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const search = query.get('search') || '';
    const status = query.get('status') || 'all';
    const sort = query.get('sort') || 'priority_asc';
    const category = query.get('category') || '';

    dispatch(setSearch(search));
    dispatch(setStatus(status));
    dispatch(setSort(sort));
    dispatch(setCategory(category));
  }, [dispatch]);


  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.sort && filters.sort !== 'priority_asc') params.set('sort', filters.sort);
    if (filters.category) params.set('category', filters.category);

    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);


  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  //If needed, in my opinion, can use WS or fetch Task again for sorting right after posting new task ⬇️⬇️⬇️⬇️⬇️
  const handleCreate = (taskData) => dispatch(createTask(taskData)); 
  const handleToggleDone = (id, done) => dispatch(updateTask({ id, update: { done } }));
  const handleDelete = (id) => dispatch(deleteTask(id));


  const updateTaskPriority = (reordered) => {
    reordered.forEach(({ id, priority }) => {
      dispatch(updateTask({ id, update: { priority } }));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 pt-5 pb-5">TaskDoer</h1>

      <TaskCreateForm onCreate={handleCreate} />
      <TaskFilters />
      <TaskList
      tasks={tasks}
      onToggleDone={handleToggleDone}
      onDelete={handleDelete}
      onReorder={updateTaskPriority}
      isLoading={isLoading}
      sort={filters.sort}
    />
    </div>
  );
}