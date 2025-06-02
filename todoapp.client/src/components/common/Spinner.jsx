import React from "react";

const Spinner = ({ size = "3rem", color = "#007bff", message = "Loading..." }) => {
    const spinnerStyle = {
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTop: `4px solid transparent`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto",
    };

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={spinnerStyle}></div>
            <p style={{ marginTop: "1rem", color }}>{message}</p>
        </div>
    );
};

export default Spinner;
