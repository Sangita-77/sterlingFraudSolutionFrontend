import React, { useState } from "react";
import GlobalButtons from "../GlobalComponents/GlobalButtons";
import GlobalmModal from "../GlobalComponents/GlobalModal";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-animated";

interface Step {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface StepFormProps {
  steps: Step[];
}

const StepForm: React.FC<StepFormProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  if (!steps || steps.length === 0) {
    return <div>No steps available</div>;
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setShowPopup(false);

    // submit API
    // console.log("Form Submitted");
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
            <div key={index} className="step-item">
              <div
                className={`step-circle ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                {index + 1}
              </div>

              <div className="step-title">
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="step-body gradientBox2 DashBoardForms">
        <div className="d-flex StepTitle">
          <div className="Stepicon">
            {steps[currentStep].icon}
          </div>

          <h2>{steps[currentStep].title}</h2>
        </div>

        <div className="step-content">
          {steps[currentStep].content}
        </div>

        <div className="step-actions">
          <GlobalButtons
            onClick={prevStep}
            icon={<ArrowLeftIcon />}
            variant="purple"
            textsize="md"
            disabled={currentStep === 0}
            text="Back"
          />

          {currentStep === steps.length - 1 ? (
            <GlobalButtons
              onClick={() => setShowPopup(true)}
              icon={<ArrowRightIcon />}
              iconPosition="right"
              variant="purple"
              textsize="md"
              text="Submit"
            />
          ) : (
            <GlobalButtons
              onClick={nextStep}
              icon={<ArrowRightIcon />}
              iconPosition="right"
              variant="purple"
              textsize="md"
              text="Continue"
            />
          )}
        </div>
      </div>

      {showPopup && (
        <GlobalmModal
          header={<h3>Confirm Submission</h3>}
          onCancel={() => setShowPopup(false)}
          body={
            <>
              <p>Are you sure you want to submit this form?</p>

              <div className="modalActions">
                <button
                  className="cancelBtn"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button
                  className="confirmBtn"
                  onClick={handleSubmit}
                >
                  Yes, Submit
                </button>
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default StepForm;