import React from "react";

type StatusProps = {
  type: "info" | "warning";
  message: string;
};

const TeamStatus = ({ type, message }: StatusProps) => {
  const styles = {
    info: {
      backgroundColor: "#e8f5e9",
      color: "#388e3c",
      border: "1px solid #388e3c",
    },
    warning: {
      backgroundColor: "#ffefef",
      color: "#d32f2f",
      border: "1px solid #d32f2f",
    },
  };

  const icons = {
    info: "✅",
    warning: "⚠️",
  };

  return (
    <div
      style={{
        ...styles[type],
        padding: "10px",
        borderRadius: "5px",
        margin: "10px 0",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ marginRight: "8px", fontSize: "20px" }}>{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
};


export default TeamStatus;