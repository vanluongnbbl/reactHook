import {useState, useLayoutEffect, useEffect} from 'react'

/*
    useEffect
        1. Cập nhật lại state
        2. Cập nhật DOM (mutated)
        3. Render lại UI
        4. Gọi Cleanup nếu deps thay đổi
        5. Gọi useEffect callback

    useLayoutEffect
        1. Cập nhật lại state
        2. Cập nhật DOM
        3. Gọi cleanup nếu dependencies thay đổi (sync)
        4. Gọi useLayoutEffect callback (sync)
        5. Render lại UI
*/ 

function CuseLayoutEffect() {
    const [count, setCount] = useState(0)

    useLayoutEffect(() => {
        if (count > 3) {
            setCount(0)
        }
    }, [count])

    const handleCount = () => {
        setCount(count + 1)
    }

    return(
        <div>
            <h2>{count}</h2>
            <button onClick={handleCount}>Count</button>
        </div>
    )

}

export default CuseLayoutEffect