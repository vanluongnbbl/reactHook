import './App.css';
import {useRef, useState, useCallback} from 'react'
import Content from './components/Content'
import CuseLayoutEffect from './components/CuseLayoutEffectHook'
import CuseEffect from './components/CuseEffect'
import CuseRef from './components/CuseRef'
import CuseCallback from './components/CuseCallback'
import CuseMemo from './components/CuseMemo'
import CuseReducer from './components/CuseReducer';
function App() {
  const [count, setCount] = useState(60)
  const [showLayoutEffect, setShowLayoutEffect] = useState(false)
  const [showUseEffect, setShowUseEffect] = useState(false)
  const [showUseRef, setShowUseRef] = useState(false)
  const [showUseCallback, setShowUseCallback] = useState(false)
  const [showUseMemo, setShowUseMemo] = useState(false)
  const [showUseReducer, setShowUseReducer] = useState(false)


  let timer = useRef()

  const handleStart = () => {
    timer.current = setInterval(() => {
      if (count > 0)
       setCount(prev => prev - 1)
    }, 1000)
  }
  
  const handleStop = useCallback(() => {
    clearInterval(timer.current)
  }, [])
  

  return (
    <div className="App">
      <Content/>
      <h1>{count}</h1>
      <button onClick={handleStart} >Start</button>
      <button onClick={handleStop} >Stop</button>
      <br/>
      <br/>
      <button onClick={() => setShowLayoutEffect(!showLayoutEffect)} >Toggle useLayoutEffect</button>
      {showLayoutEffect && <CuseLayoutEffect />} <br/>
      <br/>
      <button onClick={() => setShowUseEffect(!showUseEffect)} >Toggle useEffect</button>

      {showUseEffect && <CuseEffect/>}
      <br />
      <br />

      <button onClick={() => setShowUseRef(!showUseRef)}>Toggle useRef</button>
      {showUseRef && <CuseRef />}

      <br />
      <br />
      <button onClick={() => setShowUseCallback(!showUseCallback)}>Toggle useCallback</button>
      {showUseCallback && <CuseCallback onStop={handleStop} />}

      <br />
      <br />
      <button onClick={() => setShowUseMemo(!showUseMemo)}>Toggle useMemo</button>
      {showUseMemo && <CuseMemo />}
      

      <br />
      <br />
      <button onClick={() => setShowUseReducer(!showUseReducer)}>Toggle useReducer</button>
      {showUseReducer && <CuseReducer />}
    </div>
  );
}

export default App;
