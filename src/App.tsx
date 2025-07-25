import {TaskForm} from "./components/TaskForm.tsx";
import {FilterBar} from "./components/FilterBar.tsx";
import {TaskList} from "./components/TaskList.tsx";

function App() {

  return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
          <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
              <TaskForm/>
              <FilterBar/>
              <TaskList/>
          </div>
      </div>
  )
}

export default App
