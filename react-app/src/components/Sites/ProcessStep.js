import React from 'react';

import "./ProcessStep.css";


const ProcessStep = ({ currentStep }) => {
  console.log('currentStep:', currentStep);

  const steps = [
    { num: '1', label: 'בחירה ' },
    { num: '2', label: 'הזמנה '},
    { num: '3', label: 'תשלום' },
    { num: '4', label: 'אישור ' },
  ];

  return (
    <div className="progress-indicator">
      {steps.map((step, index) => {
        const currentStepNum = parseInt(currentStep);
        const stepNum = parseInt(step.num);
        const isActiveStep = index === currentStepNum;
        const isNextStep = currentStepNum + 1 === stepNum;
        const stepClass = `test step ${isActiveStep && isNextStep ? 'step-active' : ''} `;
        const numClass = `step-num ${isActiveStep ? 'num-active' : ''}`;

        return (
          <div className={stepClass} key={index}>
            <div className={numClass}>{step.num}</div>
            <div className="step-active">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessStep;