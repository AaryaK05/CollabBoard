import React, { useEffect, useRef, useState } from 'react'

function Board({socket}) {
  const canvasRef = useRef(null);//object reference with properties passed to a given object
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);//state variable to check whether user is drawing or not


  useEffect(() => {
    const canvas = canvasRef.current;//the .current holds the canvas object
    console.log(window.innerHeight+'/'+window.innerWidth);
    canvas.width = window.innerWidth;
    canvas.height =window.innerHeight ;// actual height and width
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;// height and width of coordinate system
    
    const context = canvas.getContext('2d');
    context.scale(1,1);

    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    
    contextRef.current = context;
  }, [])

    
  socket.on('image-data',(data)=>{
    if(data.room == localStorage.getItem('room')){
      const image= new Image();
      console.log('Canvas data---'+data.data);

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
  
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    const canvas = document.getElementById('canvas');
    const canvasUrl=canvas.toDataURL();
    // console.log(canvasUrl);
    
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
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        id='canvas'
      />
      <button id='clear-canvas-btn' onClick={handleClear}>Clear</button>
    </>
  )
}

export default Board