<div className="container mx-auto mt-8 p-3 bg-gray-900">
  <h1 className="text-2xl font-bold mb-4">Todo List</h1>
  {/* Filter Buttons */}
  <div className="flex justify-center mb-4">
    <button
      className={`mr-4 px-4 py-2 rounded-full ${
        filter === "all"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
      onClick={() => setFilter("all")}
    >
      All
    </button>
    <button
      className={`mr-4 px-4 py-2 rounded-full ${
        filter === "incomplete"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
      onClick={() => setFilter("incomplete")}
    >
      Incomplete
    </button>
    <button
      className={`px-4 py-2 rounded-full ${
        filter === "complete"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
      onClick={() => setFilter("complete")}
    >
      Complete
    </button>
  </div>
  {/* Todo List */}
  <div className=" bg-gray-900">
    {filteredList.map((todo) => (
      <div
        key={todo.id}
        className={`p-4 bg-gray-800 rounded-lg mb-4 ${
          todo.done ? "text-green-500" : "text-red-500"
        }`}
      >
        <p>{todo.task}</p>
        <div className="flex justify-between mt-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
            onClick={() => handleModify(todo.id, todo.task, !todo.done)}
          >
            Modify
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>;

<div className="grid grid-cols-2 justify-start align-middle items-center gap-10">
  {/* Create Task Card */}
  <div
    className="p-4 bg-gray-800 rounded-lg w-56"
    onClick={() => setIsModalOpen(true)}
  >
    <h2 className="text-md font-semibold">Create Task</h2>
    <p className="text-9xl text-center font-bold">+</p>
  </div>

  {/* Total Tasks Card */}
  <div className="p-4 bg-gray-800 rounded-lg w-56">
    <h2 className="text-lg font-semibold">Total Tasks</h2>
    <p className="text-9xl text-center font-bold">{todoList.length}</p>
  </div>

  {/* Remaining Tasks Card */}
  <div className="p-4 bg-gray-800 rounded-lg w-56">
    <h2 className="text-lg font-semibold">Remaining Tasks</h2>
    <p className="text-9xl text-center font-bold">{inCompleted}</p>
  </div>

  {/* Completed Tasks Card */}
  <div className="p-4 bg-gray-800 rounded-lg w-56">
    <h2 className="text-lg font-semibold">Completed Tasks</h2>
    <p className="text-9xl text-center font-bold">{completed}</p>
  </div>

  {/* Graph of Completed Tasks */}
  <div className="bg-gray-800 w-56 p-4 rounded-lg">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      {/* Background Circle */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#333"
        strokeWidth="10"
      />
      {/* Completed Circle */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#4CAF50" // Dark green color
        strokeWidth="10"
        strokeDasharray={`calc(${(completed / todoList.length) * 100}% ${
          100 - (completed / todoList.length) * 100
        }%)`}
        strokeDashoffset="25"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      {/* Percentage Label */}
      <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#FFFFFF">
        {`${
          completed === 0
            ? "0"
            : Math.round((completed / todoList.length) * 100)
        }%`}
      </text>
    </svg>
  </div>
</div>;
