import React, { useState } from "react";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepFormProps {
  steps: Step[];
}

const StepForm: React.FC<StepFormProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="step-form-container">
      <div className="step-header">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="step-indicators">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-circle ${
                index <= currentStep ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <h2>{steps[currentStep].title}</h2>

      <div className="step-content">
        {steps[currentStep].content}
      </div>

      <div className="step-actions">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button onClick={() => alert("Submitted")}>
            Submit
          </button>
        ) : (
          <button onClick={nextStep}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default StepForm;