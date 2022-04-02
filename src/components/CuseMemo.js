import {useMemo, useState, useRef} from 'react'

/*
    useMemo sử dụng để không phải re-render hoặc tính toán lại
    những thứ không cần thiết, và chỉ chạy lại khi depencies 
    thay đổi giống useEffect và useCallback

    useMemo trả về value 
    
*/ 

function CuseMemo() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [products, setProducts] = useState([])

    const inputName = useRef()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
   
    const handleSubmit = () => {
        setProducts([...products, {
            name,
            price: +price
        }])
        setName('')
        setPrice(0)
        inputName.current.focus()
    }

    const total = useMemo(() => {
        const result = products.reduce((result, product) => {
            return result + product.price
        }, 0)
        // console.log('re-reder');
        return result
    }, [products])

    return (
        <div>
            <div>
                <label>Name: </label>
                <input 
                    type="text" 
                    value={name}
                    ref={inputName}
                    onChange={handleName}
                />
            </div>
            <div>
                <label>Price: </label>
                <input 
                    type="text" 
                    value={price}
                    onChange={handlePrice}
                />
            </div>
            <button type="button" onClick={handleSubmit}>Add</button>
            <h5>Total: {total}</h5>
            <div>
                <ol>
                    {products && products.map((product, i) => (
                        <li key={i}>{product.name} - {product.price}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default CuseMemo