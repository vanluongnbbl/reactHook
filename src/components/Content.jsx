import {useEffect, useState} from 'react'

/*
  1. useEffect(callback)
    -   Gọi callback mỗi khi component re-render
    -   Gọi callback sau khi component thêm element vào DOM
  2. useEffect(callback, [])
    -   Chỉ gọi callback một lần khi component mounted
  3. useEffect(callback, [dependencies])

  ----------------------------------------------------------------
  1. Callback luôn được gọi sau khi component mounted
  2. Cleanup function luôn được gọi trước khi component unmounted
  3. Cleanup function luôn được gọi trước khi callback được gọi (trừ lần đầu component mounted)
*/ 


function Content() {
   const [avatar, setAvatar] = useState()

   useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
   }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        
        file.preview = URL.createObjectURL(file)
        console.log(file.preview);
        setAvatar(file)
    }

    return (
        <div className="content">
            <h1>Content</h1>
            <input type="file" onChange={handlePreviewAvatar}/>
            {avatar && (<img src={avatar.preview} width="80%" alt="image" />)}
        </div>
    )
}

export default Content 