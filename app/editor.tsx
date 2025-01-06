import React, { useEffect, useRef } from "react";

interface DrawingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawingPanel: React.FC<DrawingPanelProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      // Set canvas to full panel dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Drawing configurations
      context.lineWidth = 3;
      context.lineCap = "round";
      context.strokeStyle = "black";

      const startDrawing = (event: MouseEvent | TouchEvent) => {
        isDrawing.current = true;
        const { x, y } = getCursorPosition(event, canvas);
        context.beginPath();
        context.moveTo(x, y);
      };

      const draw = (event: MouseEvent | TouchEvent) => {
        if (!isDrawing.current) return;
        const { x, y } = getCursorPosition(event, canvas);
        context.lineTo(x, y);
        context.stroke();
      };

      const stopDrawing = () => {
        isDrawing.current = false;
        context.closePath();
      };

      // Event listeners for drawing
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);

      canvas.addEventListener("touchstart", startDrawing);
      canvas.addEventListener("touchmove", draw);
      canvas.addEventListener("touchend", stopDrawing);

      // Cleanup event listeners on unmount
      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);

        canvas.removeEventListener("touchstart", startDrawing);
        canvas.removeEventListener("touchmove", draw);
        canvas.removeEventListener("touchend", stopDrawing);
      };
    }
  }, [isOpen]);

  // Helper function to get cursor position
  const getCursorPosition = (
    event: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "80%",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          position: "relative",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Drawing Panel</h2>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "calc(100% - 50px)",
            border: "1px solid #ccc",
            cursor: "crosshair",
            touchAction: "none", // Prevents touch scrolling
          }}
        ></canvas>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DrawingPanel;
