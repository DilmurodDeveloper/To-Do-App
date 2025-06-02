import React from "react";
import "../../../public/css/App.css";  

const StepCircleProgress = ({ step }) => {
    const size = 48;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (step / 3) * circumference;

    return (
        <div className="step-circle-progress">
            <svg width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#28a745"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#333"
                >
                    {step}/3
                </text>
            </svg>
        </div>
    );
};

export default StepCircleProgress;
