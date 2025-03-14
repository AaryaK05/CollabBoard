import React, { useEffect, useRef, useState } from 'react'

function Board({socket}) {
  const canvasRef = useRef(null);//object reference with properties passed to a given object
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);//state variable to check whether user is drawing or not


  useEffect(() => {
    const canvas = canvasRef.current;
    // const context = canvas.getContext('2d');

    const resizeCanvas = () => {
      if (!canvas) return;

      // Save current canvas content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempContext = tempCanvas.getContext('2d');
      tempContext.drawImage(canvas, 0, 0);

      // Resize canvas based on device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Scale for high DPI screens
      const context = canvas.getContext('2d');
      context.scale(dpr, dpr);
      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      contextRef.current = context;

      // Restore previous state
      context.drawImage(tempCanvas, 0, 0);
    };

    resizeCanvas(); // Initial setup
    window.addEventListener('resize', resizeCanvas);

  

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [socket]);
    
  socket.on('image-data',(data)=>{
    if(data.room === localStorage.getItem('room')){
      const image= new Image();

      image.onload=function(){
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.drawImage(image,0,0);
      }
      image.src=data.data;
    }
  })

  socket.on('clearCanvas',()=>{
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 5000, 5000);
  })


  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    
    setIsDrawing(true);
  }

  const startDrawingTouch = ({ nativeEvent }) => {
    const { touches } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(touches[0].clientX, touches[0].clientY);
    setIsDrawing(true);
  }

  
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    const canvas = document.getElementById('canvas');
    const canvasUrl=canvas.toDataURL();
    
    socket.emit('image-data',canvasUrl);
  }
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const touchDraw=({nativeEvent})=>{
    if (!isDrawing) {
      return;
    }

    const { touches } = nativeEvent;
    contextRef.current.lineTo(touches[0].clientX, touches[0].clientY);
    contextRef.current.stroke();
  }
  
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 5000, 5000);

    socket.emit('clearCanvas');
  }
  
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onTouchStart={startDrawingTouch}
        onMouseUp={finishDrawing}
        onTouchEnd={finishDrawing}
        onMouseMove={draw}
        onTouchMove={touchDraw}
        id='canvas'
      />
      <button id='clear-canvas-btn' onClick={handleClear}>Clear</button>
    </>
  )
}

export default Board