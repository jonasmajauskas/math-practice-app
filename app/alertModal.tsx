"use client";

import React from "react";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
          textAlign: "center",
          color: "black",
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
