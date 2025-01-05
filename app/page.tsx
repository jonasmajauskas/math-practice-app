"use client";

import React, { useState, useEffect } from "react";
import { evaluate, round } from "mathjs";

type Operation = "+" | "-" | "*" | "/" | "frac" | "percent";

export default function MathPractice() {
  const [equation, setEquation] = useState("");
  const [previousEquation, setPreviousEquation] = useState("");
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [operation, setOperation] = useState<Operation>("+");
  const [difficulty, setDifficulty] = useState(1);
  const [inputStatus, setInputStatus] = useState(""); // Track input status

  useEffect(() => {
    setEquation(generateEquation(operation, difficulty));
  }, [operation, difficulty]);

  const resetInputStatus = () => {
    setTimeout(() => setInputStatus(""), 2000);
  };
  

  const handleSubmit = () => {
    if (input.trim() === "") {
      setFeedback("Please enter a valid number.");
      return;
    }

    try {
      let correctAnswer;
      if (operation === "percent") {
        const [percent, of] = equation
          .match(/\d+/g)
          ?.map(Number) ?? [0, 0];
        correctAnswer = round((percent / 100) * of, 2);
      } else {
        correctAnswer = round(evaluate(equation), 2);
      }

      if (parseFloat(input) === correctAnswer) {
        setFeedback("✅ Correct!");
        setInputStatus("correct"); // Mark input as correct

        resetInputStatus();
      } else {
        setFeedback(
          `❌ Incorrect. The correct answer is ${correctAnswer}. You entered ${input}.`
        );
        setInputStatus("incorrect"); // Mark input as incorrect

        resetInputStatus();
      }
    } catch (error) {
      console.error("Evaluation error:", error);
      setFeedback("Error evaluating the equation.");
      setInputStatus("error");
    }

    setInput("");
    setPreviousEquation(equation);
    setEquation(generateEquation(operation, difficulty));
  };


  const handleBack = () => {
    if (previousEquation) {
      setEquation(previousEquation);
      setPreviousEquation("");
    } else {
      setFeedback("No previous equation to go back to.");
    }
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value as Operation);
    setEquation(generateEquation(e.target.value as Operation, difficulty));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(parseInt(e.target.value));
    setEquation(generateEquation(operation, parseInt(e.target.value)));
  };

  const handleButtonClick = (value: string) => {
    setInput(input + value);
  };

  const getInputBackgroundColor = () => {
    switch (inputStatus) {
      case "correct":
        return "lightgreen";
      case "incorrect":
        return "lightcoral";
      case "error":
        return "lightyellow";
      default:
        return "white";
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "50px",
          marginBottom: "20px",
          justifyContent: "center", // Centers content horizontally within the grid
        }}
      >
        <strong>{equation}</strong>

        <span style={{ margin: "0 10px" }}>=</span>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setInputStatus(""); // Reset input status while typing
          }}
          style={{
            fontSize: "18px",
            padding: "10px",
            width: "100px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
            backgroundColor: getInputBackgroundColor(),
            transition: "background-color 0.3s",
          }}
          autoFocus
        />
      </div>

      <p style={{ fontSize: "20px", marginTop: "5px" }}>
  {feedback.split('. ').map((sentence, index) => (
    <span key={index}>
      {sentence.trim()}
      {index < feedback.split('. ').length - 1 && <br />}
    </span>
  ))}
</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          width: "90%", // Adjusts width based on screen size
          maxWidth: "500px", // Caps the maximum width
          margin: "0 auto", // Centers horizontally
          justifyContent: "center", // Centers content horizontally within the grid
          alignContent: "center", // Centers content vertically if height is constrained
        }}
      >
        {/* Render the number and dot buttons */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((num, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(num.toString())}
            style={{
              fontSize: "24px",
              padding: "30px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              backgroundColor: "#f1f1f1",
              color: "black",
              cursor: "pointer",
            }}
          >
            {num}
          </button>
        ))}

        {/* Submit button */}
        <button
          onClick={handleSubmit} // Submit logic
          style={{
            fontSize: "20px",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#007BFF",
            color: "white",
            gridColumn: "span 3",
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        {/* Back button */}
        <button
          onClick={handleBack} // Back logic
          style={{
            fontSize: "20px",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#28a745",
            color: "white",
            gridColumn: "span 3",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        {/* Clear button */}
        <button
          onClick={() => setInput(input.slice(0, -1))} // Clear last input
          style={{
            fontSize: "20px",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#ffcccc",
            color: "black",
            gridColumn: "span 3",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>


      {/* <div>
        {[...Array(11).keys()].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            style={{
              fontSize: "18px",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f1f1f1",
              color: "black",
            }}
          >
            {num}
          </button>
        ))}
      </div> */}

      {/* <button
        onClick={handleSubmit}
        style={{
          fontSize: "18px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Submit Answer
      </button>
      <button
        onClick={handleBack}
        style={{
          fontSize: "18px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#28a745",
          color: "#fff",
          cursor: "pointer",
          marginLeft: "10px",
          marginTop: "20px",
        }}
      >
        Go Back
      </button> */}

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="operation">Choose Operation: </label>
        <select
          id="operation"
          value={operation}
          onChange={handleOperationChange}
          style={{
            fontSize: "18px",
            padding: "10px",
            width: "200px",
            margin: "0 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
          }}
        >
          <option value="+">Addition</option>
          <option value="-">Subtraction</option>
          <option value="*">Multiplication</option>
          <option value="/">Division</option>
          <option value="frac">Fractions</option>
          <option value="percent">Percentages</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="difficulty">Select Difficulty (1-10): </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          style={{
            fontSize: "18px",
            padding: "10px",
            width: "200px",
            margin: "0 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "black",
          }}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function generateEquation(operation: Operation, difficulty: number) {
  const max = difficulty * 10;

  const num1 = Math.floor(Math.random() * max) + 1;
  let num2 = Math.floor(Math.random() * max) + 1;

  if (operation === "/") {
    num2 = Math.max(num2, 1);
  }

  switch (operation) {
    case "+":
      return `${num1} + ${num2}`;
    case "-":
      return `${num1} - ${num2}`;
    case "*":
      return `${num1} * ${num2}`;
    case "/":
      return `${num1} / ${num2}`;
    case "frac":
      return `${num1} / ${num2}`;
    case "percent":
      return `What is ${num1}% of ${num2}?`;
    default:
      return `${num1} + ${num2}`;
  }
}
