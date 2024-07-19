import { createRef, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const reference = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(frameCount % ctx.canvas.width, (frameCount * 10 % (ctx.canvas.height * ctx.canvas.width)) / ctx.canvas.width, 10, 10);
  }

  useEffect(() => {
    const canvas = reference.current;
    const context = canvas?.getContext('2d');
    let frameCount = 0;
    let animationFrameId = 0;
    if (context) {
      const render = () => {
        frameCount++;
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      }
      render();
      return () => {
        window.cancelAnimationFrame(animationFrameId);
      }
    }
  }, [draw])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <canvas ref={reference} id="canvas" width="150" height="150"></canvas>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
