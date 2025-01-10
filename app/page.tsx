"use client";

import React, { useState, useEffect } from "react";
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { evaluate, round } from "mathjs";
import DrawingPanel from "./editor";
import AlertModal from "./alertModal";
import { MdCalculate, MdInfo, MdRefresh } from 'react-icons/md';
import { IoIosArrowBack } from "react-icons/io";


type Operation = "+" | "-" | "*" | "/" | "frac" | "percent" | "earnings_growth";

export default function MathPractice() {
  const [equation, setEquation] = useState("");
  const [previousEquation, setPreviousEquation] = useState("");
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [operation, setOperation] = useState<Operation>("+");
  const [difficulty, setDifficulty] = useState(1);
  const [inputStatus, setInputStatus] = useState("");
  const [isDrawingPanelOpen, setIsDrawingPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEquation(generateEquation(operation, difficulty));
  }, [operation, difficulty]);

  const resetInputStatus = () => {
    setTimeout(() => setInputStatus(""), 2000);
  };

  function generateEquation(operation: Operation, difficulty: number) {
    const max = difficulty * 10;

    const num1 = Math.floor(Math.random() * max) + 1;
    let num2 = Math.floor(Math.random() * max) + 1;

    if (operation === "earnings_growth") {
      const previousEPS = Math.floor(Math.random() * 100 + 1) * difficulty;
      const currentEPS = previousEPS + Math.floor(Math.random() * 50 + 1);
      return `${previousEPS} to ${currentEPS} EPS growth percentage`;
    }

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
        return `${num1}% of ${num2}?`;
      default:
        return `${num1} + ${num2}`;
    }
  }

  const handleSubmit = () => {
    if (input.trim() === "") {
      setFeedback("Please enter a valid number.");
      setIsModalOpen(true);
      return;
    }

    try {
      let correctAnswer;
      if (operation === "percent") {
        const [percent, of] = equation
          .match(/\d+/g)
          ?.map(Number) ?? [0, 0];
        correctAnswer = round((percent / 100) * of, 2);
      } else if (operation === "earnings_growth") {
        const [previousEPS, currentEPS] = equation
          .match(/\d+/g)
          ?.map(Number) ?? [0, 0];
        correctAnswer = round(((currentEPS - previousEPS) / previousEPS) * 100, 2); // EPS growth percentage formula
      } else {
        correctAnswer = round(evaluate(equation), 2);
      }

      if (parseFloat(input) === correctAnswer) {
        setFeedback("✅ Correct!");
        setInputStatus("correct");
        resetInputStatus();
      } else {
        setFeedback(
          `❌ Incorrect. The correct answer is ${correctAnswer}. You entered ${input}.`
        );
        setIsModalOpen(true);
        setInputStatus("incorrect");
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

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(parseInt(e.target.value));
    setEquation(generateEquation(operation, parseInt(e.target.value)));
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value as Operation);
    setEquation(generateEquation(e.target.value as Operation, difficulty));
  };

  const handleButtonClick = (value: string) => {
    if (value === 'calculate-icon') {
      console.log("Special action triggered for CalculateIcon!");
      setInput(""); // Clear the input
      setIsDrawingPanelOpen(true); // Open the drawing panel
    } else {
      setInput((prevInput) => prevInput + value); // Append the value to the input string
    }
  };

  const getInputBackgroundColor = () => {
    return inputStatus === "error" ? "#ffe6e6" : "#f0f0f0";
  };

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, 'calculate-icon'];


  return (
    <View style={styles.container}>
      <View style={styles.equationContainer}>
        <Text style={styles.equationText}>{equation}</Text>
        <TouchableOpacity onPress={() => alert('Info icon clicked')}>
          <MdInfo size={30} color="black" style={styles.infoIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IoIosArrowBack size={30} color="black" />
        </TouchableOpacity>

        {/* New container for input and clear button */}
        <View style={styles.rightContainer}>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: getInputBackgroundColor(),
                borderColor: inputStatus === "error" ? "red" : "#ccc",
                textAlign: 'right',  // Align text to the right
                writingDirection: 'rtl', // Set writing direction to right-to-left
              },
            ]}
            value={input}
            onChangeText={(text) => {
              setInput(text);
              setInputStatus(""); // Reset input status while typing
            }}
            autoFocus
          />

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setInput(input.slice(0, -1))}
          >
            <MdRefresh size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>


      {/* <View style={styles.buttonContainer}> */}
      <View style={styles.gridContainer}>
        {buttons.map((num, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleButtonClick(num === 'calculate-icon' ? 'calculate-icon' : num.toString())}
            style={styles.button}
          >
            {num === 'calculate-icon' ? (
              <MdCalculate size={40} color="black" />
            ) : (
              <Text style={styles.calculatorButtonText}>{num}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {/* </View> */}

      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>


      <View style={{ alignItems: "center", marginVertical: 20, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            borderRadius: 10,
            backgroundColor: "white",
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            width: "100%",
            // maxWidth: 500,
          }}
        >
          <Text>Operation:</Text>
          <select
            value={operation}
            onChange={handleOperationChange}
            style={{
              fontSize: 18,
              padding: 5,
              borderRadius: 5,
              border: "none",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <option value="+">Addition</option>
            <option value="-">Subtraction</option>
            <option value="*">Multiplication</option>
            <option value="/">Division</option>
            <option value="frac">Fractions</option>
            <option value="percent">Percentages</option>
            <option value="earnings_growth">Earnings Growth</option>
          </select>
        </View>

        {/* Difficulty */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            borderRadius: 10,
            backgroundColor: "white",
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            width: "100%",
          }}
        >
          <Text>Difficulty:</Text>
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            style={{
              fontSize: 18,
              padding: 5,
              borderRadius: 5,
              border: "none",
              backgroundColor: "white",
              color: "black",
            }}
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%', // Use full width of the screen
    maxWidth: 600, // Limit to 600px max width
    justifySelf: 'center',
  },
  equationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'space-between', // Aligns text and icon to opposite sides
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  equationText: {
    fontSize: 50,
    color: 'black',
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  infoIcon: {
    marginLeft: 20,
  },
  helpButton: {
    marginLeft: 10,
    padding: 10,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically (centered within the row)
    justifyContent: 'space-between', // Align items horizontally with space between them
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    marginVertical: 10,
    width: '100%'
  },
  input: {
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 10
  },
  rightContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Vertically center items
    justifyContent: "flex-end", // Align the items to the right
    width: '80%', // Adjust width to fit buttons and input
  },
  gridContainer: {
    width: '100%', // Ensure the grid container spans the full width of the screen
    flexDirection: 'row', // Arrange the buttons horizontally
    flexWrap: 'wrap', // Allow buttons to wrap to the next row if necessary
    justifyContent: 'space-between', // Evenly space buttons horizontally
    // paddingHorizontal: 10, // Optional padding for spacing on the sides
  },
  iconPlaceholder: {
    fontSize: 14,
    color: 'gray',
  },

  button: {
    width: '30%', // 3 buttons per row (100% / 3 = 33%, so 30% allows for space between buttons)
    aspectRatio: 1, // Keep buttons square-shaped
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // Add vertical margin for spacing between rows
    backgroundColor: 'lightgrey',
    borderRadius: 15
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  calculatorButtonText: {
    fontSize: 40,
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'lightgreen',
    width: '100%',
    height: 100, // Set a fixed height (in pixels)
  },
  backButton: {
    // backgroundColor: 'lightblue',
  },
  clearButton: {
    // backgroundColor: 'lightcoral',
  },
});
