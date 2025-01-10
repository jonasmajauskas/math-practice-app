import React from "react";

interface SeparatePageProps {
  operation: string;
  navigate: () => void;
}

const SeparatePage: React.FC<SeparatePageProps> = ({ operation, navigate }) => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h2>Separate Page</h2>
      <p>
        You navigated to this page. The selected operation is:{" "}
        <strong>{operation || "No operation selected"}</strong>
      </p>
      <button
        onClick={navigate}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default SeparatePage;
