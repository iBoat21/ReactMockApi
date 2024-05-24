import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
const BASE_URL = 'https://66455ea7b8925626f891ad51.mockapi.io'

function Edit() {
    const { id } = useParams()
    const [todo, setTodo] = useState({
        name: ''
    })
    async function fetchTodo(todoId) {
        try {
            const response = await axios.get(`${BASE_URL}/todo/${todoId}`)
            setTodo(response.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(()=>{
        fetchTodo(id) 
    },[id])

    function handleNameChange(event){
        setTodo((previousState)=>({
            ...previousState,
            name: event.target.value
        }))
    }

    async function updateName() {
        try {
            await axios.put(`${BASE_URL}/todo/${id}`,{
                name: todo.name
            })
            alert('Update Success')
          } catch (error) {
            console.log('error', error)
          }
    }

    return (
        <>
            <div>Hello Edit Page : {id}</div>
            <div>{todo.name}</div>
            <div>
                <input type="text" 
                onChange={handleNameChange}
                value={todo.name}></input>
                {todo.status}
            </div>
            <button onClick={updateName}>Edit Data</button>
        </>
    )
}

export default Edit