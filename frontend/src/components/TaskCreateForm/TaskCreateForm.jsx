import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

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

const DatePickerField = ({ name }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <ReactDatePicker
      selected={values[name] ? new Date(values[name]) : null}
      onChange={date => setFieldValue(name, date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select due time and date"
      minDate={new Date()}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default function TaskCreateForm({ onCreate }) {
  const initialValues = {
    title: '',
    description: '',
    category: '',
    priority: 1,
    dueDate: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .max(100, 'Title should be 100 characters or less'),
    description: Yup.string().max(300, 'Description should be 300 characters or less'),
    category: Yup.string()
      .oneOf(Object.values(CATEGORY_OPTIONS), 'Invalid category'),
      // .required('Category is required'),
    priority: Yup.number()
      .required('Priority is required')
      .min(1, 'Min is 1')
      .max(10, 'Max is 10'),
    dueDate: Yup.date()
      // .required('Due date is required')
      .min(new Date(), 'Date cannot be in the past')
      .typeError('Invalid date format'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onCreate({ ...values, done: false });
    resetForm();
  };

  return (
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Create New Task</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Field
              name="title"
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Field
              as="textarea"
              name="description"
              rows="3"
              placeholder="Enter task description (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Category & Priority */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category */}
          <div className="relative w-[400px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>

            <Field
              as="select"
              name="category"
              className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {Object.entries(CATEGORY_OPTIONS).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              ))}
            </Field>

            <div className="pointer-events-none absolute inset-y-8 right-3 flex items-center h-[20px]">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

            {/* Priority */}
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority (1–10)</label>
              <Field
                name="priority"
                type="number"
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="priority"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <DatePickerField name="dueDate" />
            <ErrorMessage
              name="dueDate"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ➕ Add Task
          </button>
        </Form>
      </Formik>
    </div>
  );
}
