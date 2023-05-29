import React from "react";

interface ShowErrorProps {
  message?: string;
}

const ShowError = ({ message = "Error" }: ShowErrorProps) => {
  return (
    <p
      style={{
        color: "#ed4337",
        fontSize: "12px",
        padding: "3px ",
        display: "block",
      }}
    >
      {message}
    </p>
  );
};

export default ShowError;
