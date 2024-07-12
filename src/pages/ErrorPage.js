import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
