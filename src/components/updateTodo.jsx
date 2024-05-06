import React  from "react";

export default updateTodo = (taskName, status) =>{
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg w-1/2">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Update Task</h2>
                <input type="text" className="w-full border border-gray-300 p-2 mb-2" placeholder="Task Name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
                <div className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" checked={newTaskDone} onChange={(e) => setNewTaskDone(e.target.checked)} />
                  <label className="text-sm">Done</label>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={handleAddTask}>Add</button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}