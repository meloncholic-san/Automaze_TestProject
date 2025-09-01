# Automaze Test Project

A full-stack **TODO Task application** built as a test assignment.  
Stack: **Node.js + Express + MongoDB + Mongoose** (backend) and **Next.js + React/Redux + TailwindCSS** (frontend).  

---

## Backend

### Tech
- Node.js  
- Express  
- MongoDB  
- Mongoose  

### Features
- **REST API** for task management (`/api/tasks`)  
- Full **CRUD operations** (create, read, update, delete)  
- Task attributes:  
  - Title  
  - Description  
  - Status (done/undone)  
  - Priority (1–10)  
  - Due date  
  - Category  
- Filtering, searching, sorting  
- Middleware for **error handling** and **validation**  
- **JWT Authorization** for protected routes  

---

## Frontend

### Tech
- Next.js  
- React  
- Redux  
- TailwindCSS  
- Formik + Yup  

### Features

#### Authentication Flow
- Registration with avatar upload  
- Login / Logout with JWT  
- Protected routes (redirect unauthorized users)  

#### Task Management
- Create, edit, delete tasks  
- Task attributes: title, description, priority (1–10), category, due date, status (done/undone)  
- Drag-and-drop reordering of tasks (**dnd-kit**)  
- Mark tasks as done/undone with instant UI updates  

#### Filters & Search
- Search tasks by title/description  
- Filter by status (done/undone), category, or priority  
- Reset filters with one click  

#### Form Handling & Validation
- **Formik + Yup** validation  
- Date/time picker for due dates  
- Inline error messages  

#### UI/UX Enhancements
- Responsive design (**TailwindCSS**)  
- Toast notifications (**react-toastify**)  
- Loading states & skeletons for task list  
- Custom 404 page with auto-redirect  
- Persistent filters and session state via Redux  

---

## Deployment
- **Backend:** Railway  
- **Frontend:** Vercel  

---

## Deliverables
- **Live App:** [automazetestproject2.vercel.app](https://automazetestproject2.vercel.app)  
- **Repository:** [GitHub Repo](https://github.com/meloncholic-san/Automaze_TestProject)  
