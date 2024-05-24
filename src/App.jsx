import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'https://66500846ec9b4a4a6030745c.mockapi.io'

function App() {
  const [todo, setTodo] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function fetchTodo() {
    try {
      const response = await axios.get(`${BASE_URL}/todo`)
      setTodo(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true)
      await axios.delete(`${BASE_URL}/todo/${id}`)
      await fetchTodo()
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchTodo()
  }, [])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <div>
            {todo.map((todo, index) => (
              <div key={index}>
                {todo.id} {todo.name} {todo.status}
                <Link to={`/todo/${todo.id}`}>
                    <button>Edit</button>
                </Link>
                <button
                  onClick={async () => {
                    await deleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )  
}

export default App