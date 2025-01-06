import React, { useState } from "react";

interface CalculatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorPanel: React.FC<CalculatorPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState("");

  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      const evalResult = new Function(`return ${input}`)();
      setInput(evalResult.toString());
    } catch {
      alert("Invalid expression");
    }
  };

  const clearInput = () => {
    setInput("");
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
          height: "60%",
          width: "90%", // Adjust width to be 90% of the viewport width
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Display Current Input */}
        <div
          style={{
            height: "50px",
            fontSize: "1.5rem",
            color: "black",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#f9f9f9",
          }}
        >
          {input || "0"}
        </div>

        {/* Calculator Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "10px",
            color: "black",
            marginTop: "20px",
          }}
        >
          {/* Number Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {[..."7894561230."].map((digit) => (
              <button
                key={digit}
                onClick={() => handleInput(digit)}
                style={{
                  padding: "15px",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                {digit}
              </button>
            ))}
          </div>

          {/* Operator Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {["+", "-", "*", "/"].map((op) => (
              <button
                key={op}
                onClick={() => handleInput(op)}
                style={{
                  padding: "15px",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                {op}
              </button>
            ))}
            {/* Equals Button */}
            {/* <button
              onClick={calculateResult}
              style={{
                padding: "15px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              =
            </button> */}
          </div>
        </div>

        <button
          onClick={calculateResult}
          style={{
            marginTop: "10px",
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "5px",
            backgroundColor: "#D7D8D8",
            color: "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>

        {/* Clear Button */}
        <button
          onClick={clearInput}
          style={{
            marginTop: "10px",
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "5px",
            backgroundColor: "#D7D8D8",
            color: "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "5px",
            backgroundColor: "#D7D8D8",
            color: "black",
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

export default CalculatorPanel;
