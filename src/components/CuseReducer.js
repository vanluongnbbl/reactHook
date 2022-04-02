import {useState, useReducer, useRef} from 'react'


/*
    useState
        1. Init state: 0
        2. Actions: up(state + 1)
    
    useReducer
        1. Init state
        2. Actions
        3. Reducer
        4. Dispatch
*/

// 1. Init state
const initState = {
    job: '',
    jobs: []
}

// 2. Actions
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'
const EDIT_JOB = 'edit_job'

const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}

const addJob = payload => {
    return {
        type: ADD_JOB,
        payload
    }
}

const deleteJob = payload => {
    return {
        type: DELETE_JOB,
        payload
    }
}

const editJob = (payload, index) => {
    return {
        type: EDIT_JOB,
        payload,
        index
    }
}




// 3. Reducer
const reducer = (state, action) => {

    let newState 
    let newJobs = [...state.jobs]

   switch(action.type){
        case SET_JOB: 
            newState = {
                ...state,
                job: action.payload
            }
            break;
        case ADD_JOB: 
            newJobs.push(action.payload)

            newState = {
                ...state,
                jobs: newJobs
            }
            break
        case DELETE_JOB: 
            newJobs.splice(action.payload, 1)

            newState = {
                ...state,
                jobs: newJobs
            }
            break;
        case EDIT_JOB: 
            state.jobs[action.index] = action.payload

            newState = {
                ...state,
                jobs: newJobs
            }
            break
        default:
            throw new Error
   }

   return newState
}

function CuseReducer() {
    const [state, dispatch] = useReducer(reducer, initState)
    const [idEdit, setIdEdit] = useState()
    const { job, jobs} = state

    const inputRef = useRef()

    const handleSubmit = () => {
        if(idEdit) {
            dispatch(editJob(job ,idEdit))
            setIdEdit()
        } else {
            dispatch(addJob(job))
        }
        dispatch(setJob(''))
        inputRef.current.focus()
    }

    const handleJob = (e) => {
        dispatch(setJob(e.target.value))
    }

    const handleDeleteJob = (i) => {
        dispatch(deleteJob(i))
    }

    const handleEditJob = (i) => {
        dispatch(setJob(jobs[i]))
        setIdEdit(i)
    } 
   
    return (
        <div>
            <h3>Todo</h3>

            <input 
                type="text" 
                placeholder="Enter todo..." 

                value={job}
                onChange={handleJob}
                ref={inputRef}
            />
            <button type="button" onClick={handleSubmit}>Add</button>
            <ol>
                {
                    jobs && jobs.map((job, i) => (
                        <li key={i}>
                            {job} - 
                            <button onClick={() => handleDeleteJob(i)}>delete</button>
                            <button onClick={() => handleEditJob(i)}>edit</button>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}

export default CuseReducer