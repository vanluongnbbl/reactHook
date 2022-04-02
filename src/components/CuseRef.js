import {useEffect, useRef, useState} from 'react'

/*
    Sẽ không lưu lại gái trị mặc định của nó trong những lần 
    re-render tiếp theo
*/ 

function CuseRef() {
    const [count, setCount] = useState(60)
    const timer = useRef()
    const prevCount = useRef()
    const h2Ref = useRef()

    useEffect(() => {
        prevCount.current = count 
    }, [count])

    useEffect(() => {
        const rect = h2Ref.current.getBoundingClientRect()
        // console.log(rect);
    }, [])
    
    const handleStart = () =>{
        timer.current = setInterval(() => {
            setCount(prev => prev - 1)
        }, 1000)
    }
    
    const handleStop = () => {
        clearInterval(timer.current)
    }
    
    // console.log(count, prevCount.current )

    return (
        <div>
            <h2 ref={h2Ref}>{count}</h2>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>

        </div>
    )
}

export default CuseRef