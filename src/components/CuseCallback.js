import {useSate, useCallback, memo} from 'react'

/*
    Chỉ sử dụng useCallback khi có react memo và ngược lại
    nếu sử dụng react memo thì phải dùng useCallback cho tất cả các function

    useCallback sử dụng để tránh việc re-render function không cần thiết

    useCallback trả về callback
*/ 

function CuseCallback({onStop}) {

    return (
        <div>
            <button onClick={onStop}>Stop</button>
        </div>
    )
}

export default memo(CuseCallback)