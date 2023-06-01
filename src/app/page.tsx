"use client"
import { MdOutlineClose } from 'react-icons/md'
import { useState } from 'react'

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [isCreationDialogShown, setIsCreationDialogShown] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [todo, setTodo] = useState<Todo>()

  function createNewTodo() {
    setIsCreationDialogShown(true)
    setTodo(new Todo("", "", false))
    setIsEditMode(false)
  }

  function onSubmit(todo: Todo) {
    setIsCreationDialogShown(false)
    if (!isEditMode) {
      const id = todoList.length + 1
      const newTodo = new Todo(todo.title, todo.description, todo.isDone, id)
      setTodoList([...todoList, newTodo])
    } else {
      const updatedList = todoList.map(todoItem => {
        if (todoItem.id == todo.id) {
          todoItem = todo
        }
        return todoItem
      })
      setTodoList(updatedList)
    }
  }

  function onDeleteTodo(todo: Todo) {
    setIsCreationDialogShown(false)
    const newArray = todoList.filter((todoItem) => todoItem.id != todo.id)
    setTodoList(newArray)
  }

  function closeModal() {
    setIsCreationDialogShown(false)
  }

  function onTodoClicked(todo: Todo) {
    setIsCreationDialogShown(true)
    setIsEditMode(true)
    setTodo(todo)
  }
  function handleIsDoneTodo(todo: Todo) {
    const updatedList = todoList.map(todoItem => {
      if (todoItem.id == todo.id) {
        todo.isDone = !todo.isDone
      }
      return todoItem
    })
    setTodoList(updatedList)
  }

  return (
    <main className='flex flex-col h-screen bg-gradient-to-r from-rose-600 from-10% to-fuchsia-700 to-90% '>
      {/* <main className='flex flex-col h-screen bg-dark-blue'> */}

      {!isCreationDialogShown &&
        <HomeComponent
          createNewTodo={createNewTodo}
          todoList={todoList}
          setIsDone={handleIsDoneTodo}
          onTodoClicked={onTodoClicked} />}
      {isCreationDialogShown &&
        <div className='flex flex-col grow justify-center items-center'>
          <CreateNewTodoComponent
            isEditMode={isEditMode}
            onDoneTodo={onSubmit}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            closeModal={closeModal} />
        </div>
      }
    </main>
  )
}

function TodoComponent(props: { todo: Todo, onTodoClicked: () => void, setIsDone: () => void }) {
  const shadowColors = [
    'hover:shadow-yellow-500',
    'hover:shadow-indigo-500',
    'hover:shadow-orange-500',
    'hover:shadow-lime-500',
  ]
  const textColors = [
    'text-yellow-500',
    'text-indigo-500',
    'text-orange-500',
    'text-lime-500',
  ]
  const random = Math.floor(Math.random() * shadowColors.length)
  const shadowColor = shadowColors[random]
  const textColor = textColors[random]
  const isDone = props.todo.isDone ? "line-through" : ""

  return (
    <div onDoubleClick={props.onTodoClicked} onClick={props.setIsDone} className={`block max-w-sm p-6 rounded-lg cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-700 shadow-2xl ${shadowColor} `}>
      <h5 className={`${textColor} mb-2 text-2xl font-bold tracking-tight  cursor-pointer ${isDone}`}>{props.todo.title}</h5>
      <p className={`font-normal ${textColor} cursor-pointer ${isDone}`}>{props.todo.description}</p>
    </div>
  )
}

function HomeComponent(props: {
  createNewTodo: () => void,
  onTodoClicked: (todo: Todo) => void,
  setIsDone: (todo: Todo) => void,
  todoList: Todo[]
}) {
  return (<>
    <div className='flex flex-row justify-between m-10'>
      <h1 className='text-4xl bg-clip-text animate-colorSwitchText font-bold tracking-widest'>
        Todo App
      </h1>
      <button className="bg-transparent font-semibold py-2 px-4 border-2 animate-colorSwitchButton hover:animate-colorSwitchButtonHover hover:text-white rounded"
        onClick={props.createNewTodo}>
        Create new todo
      </button>
    </div>
    <div className='flex flex-row flex-wrap gap-3 m-10'>
      {props.todoList.map(todoItem => (
        <TodoComponent key={todoItem.id} onTodoClicked={() => props.onTodoClicked(todoItem)} setIsDone={() => props.setIsDone(todoItem)} todo={todoItem} />
      ))}
    </div>
  </>
  )
}

function CreateNewTodoComponent(props: {
  onDoneTodo: (todo: Todo) => void,
  onDeleteTodo: (todo: Todo) => void
  closeModal: () => void,
  todo?: Todo
  isEditMode: boolean
}) {
  const [todoItem, setTodoItem] = useState<Todo>(props.todo ? props.todo : new Todo("", "", false))
  const [isTodoEmpty, setIsTodoEmpty] = useState({ isTitleEmpty: false, isDescEmpty: false })

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTodoEmpty(prevState => {
      return { ...prevState, isTitleEmpty: false }
    })
    setTodoItem(prevTodo => {
      return { ...prevTodo, title: event.target.value }
    })
  }
  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTodoEmpty(prevState => {
      return { ...prevState, isDescEmpty: false }
    })

    setTodoItem(prevTodo => {
      return { ...prevTodo, description: event.target.value }
    })
  }
  function validateTodoAndSubmit() {
    if (todoItem.title == "") {
      setIsTodoEmpty(prevState => {
        return { ...prevState, isTitleEmpty: true }
      })
    }
    if (todoItem.description == "") {
      setIsTodoEmpty(prevState => {
        return { ...prevState, isDescEmpty: true }
      })
    }
    if (todoItem.title != "" && todoItem.description != "") {
      setIsTodoEmpty({ isTitleEmpty: false, isDescEmpty: false })
      props.onDoneTodo(todoItem)
    }
  }

  return (
    <div className="w-full max-w-sm p-4 rounded-lg animate-colorSwitch sm:p-6 md:p-8 bg-gray-800 border-gray-700">
      <span className='flex justify-end cursor-pointer mb-2' onClick={props.closeModal}>
        <MdOutlineClose size={20} />
      </span>
      <h5 className="text-xl font-medium text-white">{props.isEditMode ? "Update" : "Create New"} Todo</h5>
      <div className='my-4'>
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">What do you want to do?</label>
        <input type="text" name="title" value={todoItem.title} onChange={handleTitle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Learn react" required autoFocus />
        {isTodoEmpty.isTitleEmpty && <span className="text-red-400 m-2">Title can't be empty</span>}
      </div>
      <div className='my-4'>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Further Description</label>
        <input type="text" name="description" value={todoItem.description} onChange={handleDescription} placeholder="Learn nav components" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        {isTodoEmpty.isDescEmpty && <span className="text-red-400 m-2">Description can't be empty</span>}
      </div>
      <button type="submit" onClick={validateTodoAndSubmit} className="w-full my-4 text-white focus:ring-4 focus:outline-non font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{props.isEditMode ? "Update" : "Create"} Todo</button>
      {props.isEditMode && <button type="submit" onClick={() => props.onDeleteTodo(todoItem)} className="w-full mb-4 text-white focus:ring-4 focus:outline-non font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-rose-600 hover:bg-rose-700 focus:ring-rose-800">Delete Todo</button>}
    </div>
  )
}


class Todo {
  constructor(
    public title: string,
    public description: string,
    public isDone: boolean,
    public id?: number
  ) { }
}