import {TaskForm} from "./components/TaskForm.tsx";
import {FilterBar} from "./components/FilterBar.tsx";
import {TaskList} from "./components/TaskList.tsx";

function App() {

  return (
      <div className="max-w-screen-sm mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
          <TaskForm/>
          <FilterBar/>
          <TaskList/>
      </div>
  )
}

export default App
