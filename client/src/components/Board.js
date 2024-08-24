import React, { useEffect, useRef, useState } from 'react'

function Board() {
  const canvasRef = useRef(null);//object reference with properties passed to a given object
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);//state variable to check whether user is drawing or not


  useEffect(() => {
    const canvas = canvasRef.current;//the .current holds the canvas object
    console.log(window.innerHeight+'/'+window.innerWidth);
    canvas.width = 1500;
    canvas.height = 800;
    canvas.style.width = '1500px';
    canvas.style.height = '800px';
    
    const context = canvas.getContext('2d');
    context.scale(1,1);

    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    
    contextRef.current = context;
  }, [])
  
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }
  
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }
  
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 5000, 5000);
  }
  
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        
      />
      <button id='clear-canvas-btn' onClick={handleClear}>Clear Canvas</button>
    </>
  )
}

export default Board