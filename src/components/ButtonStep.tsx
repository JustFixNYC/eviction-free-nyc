import React from "react";

const ButtonStep: React.FC<{
  stepFn: any;
  isDisabled: boolean;
  children: React.ReactNode;
}> = ({ stepFn, isDisabled, children }) => (
  <button
    disabled={isDisabled}
    onClick={stepFn}
    className="btn btn-steps btn-block btn-centered"
  >
    {children}
  </button>
);

export default ButtonStep;
