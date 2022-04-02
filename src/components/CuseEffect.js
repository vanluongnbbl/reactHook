import {useEffect, useState} from 'react'

/*
    useEffect

    Side effect: Khi có một tác động xảy ra, dẫn đến dữ
                 liệu của chương trình thay đổi thì gọi là
                 side effect (Update DOME, Call API, update state)

    1. useEffect(callback)
        - Gọi callback mỗi khi component re-render
        - Gọi callback sau khi component thên element vào dom
    2. useEffect(callback, [])
        - Chỉ gọi callback 1 lần sau khi component mounted
    3. useEffect(callback, [deps])
        - Callback sẽ được gọi mỗi khi deps thay đổi
                 ----------
    1. Callback luôn được gọi sau khi component mounted
    2. Cleanup function luôn được gọi trước khi component unmounted
*/ 

const nameURL = [
    'posts',
    'albums',
    'photos'
]


function CuseEffect() {
    const [title, setTitle] = useState('')
    const [datas, setDatas] = useState([])
    const [name, setName] = useState('posts')
    const [isShow, setIsShow] = useState(false)
    const [count, setCount] = useState(600)
    const [avatar, setAvatar] = useState()
    // const [start, ]

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${name}`)
            .then(res => res.json())
            .then(data  => setDatas(data))
    }, [name])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 200) {
                setIsShow(true)
            } else {
                setIsShow(false)
            }
            
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const handleStartCount = setInterval(() => {
                setCount(prev => prev - 1)
            }, 1000)
        
        return () => {
            clearInterval(handleStartCount)
        }
    }, [])

    useEffect(() => {

        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const handlePreview = (e) => {
        const file = e.target.files[0]

        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }


    return (
        <div>
            <label htmlFor='title'>Title </label>
            <input 
                type="text"
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
             />
             <br/>

             <div>
                 <h3>{count}</h3>
                 <button >Start</button>
                 <button >Stop</button>
             </div>
            {isShow && <button className='goToTop' >Top</button>}
            <div>
                <h2>Avatar</h2>
                <input 
                    type='file'
                    onChange={handlePreview} 
                />
                <br/>
                <img src={avatar && avatar.preview} alt="avatar" width="80%" />
            </div>
             <h2>Content</h2>
                {
                nameURL.map((name) => (
                    <button 
                        key={name}
                        onClick={() => setName(name)}
                    >
                        {name}
                    </button>
                    ))
                }
             <ol>
                 {datas.map((data, index) => (
                     <li key={index}>
                         <h5>{data.title}</h5>
                         {data.url ? <img src={data.url} width="80%"/> : <p>{data.body}</p>}
                     </li>

                 ))}
             </ol>
        </div>
    )
}

export default CuseEffect