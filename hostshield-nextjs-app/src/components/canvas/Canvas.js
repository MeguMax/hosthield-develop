import React, {Fragment} from 'react'
import useCanvas from './useCanvas';

const Canvas = props => {
    const {setImageURL, ...restProps} = props;
    let drawing = false;
    let mousePos = {
      x: 0,
      y: 0
    };
    let lastPos = mousePos;
    const draw = (ctx) => {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
          }
    }

    const canvasRef = useCanvas(draw);

  const getMousePos = (canvasDom, mouseEvent) => {
      const rect = canvasDom.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
      }
  }

  const getTouchPos = (canvasDom, touchEvent) => {
    const rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  const handleOnMouseUp = (event) => {
    drawing = false;
  }

  const handleOnMouseDown = (event) => {
    drawing = true;
    lastPos = getMousePos(canvasRef.current, event);
  }

  const handleOnMouseMove = (event) => {
    mousePos = getMousePos(canvasRef.current, event);
  }

  const handleOnTouchStart = (event) => {
    mousePos = getTouchPos(canvasRef.current, event);
    const touch = event.touches[0];
    const me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    // canvasRef.current.dispatchEvent(me);
    handleOnMouseDown(me);
  }

  const handleOnTouchEnd = (event) => {
    const me = new MouseEvent("mouseup", {});
    // canvasRef.current.dispatchEvent(me);
    handleOnMouseUp(me);
  }

  const handleOnTouchMove = (event) => {
    const touch = event.touches[0];
    const me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    // canvasRef.current.dispatchEvent(me);
    handleOnMouseMove(me); //
  }

  const clearCanvas = () => {
    canvasRef.current.width = canvasRef.current.width;
    setImageURL("");
  }
  const saveCanvasImage = () => {
      if (typeof setImageURL === 'function') {
          const imageURL = canvasRef.current.toDataURL("image/png");
          setImageURL(imageURL);
      }
  };

  return(
      <Fragment>
        <canvas
            width={250}
            height={150}
            ref={canvasRef}
            onMouseUp={handleOnMouseUp}
            onMouseDown={handleOnMouseDown}
            onMouseMove={handleOnMouseMove}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            onTouchMove={handleOnTouchMove}
            {...restProps}
        />
        <div className="flex justify-center items-center space-x-2 mt-2">
            <button
                 type="button"
                  className="savesign-button bg-site-main text-xs px-2 py-0.5 text-white tracking-wide rounded-sm"
                  onClick={clearCanvas}
                >
                  Clear
             </button>
            <button
                type="button"
                className="savesign-button bg-site-main text-xs px-2 py-0.5 text-white tracking-wide rounded-sm"
                onClick={saveCanvasImage}
            >
                Confirm
            </button>
        </div>
      </Fragment>
  )
}

export default Canvas;
