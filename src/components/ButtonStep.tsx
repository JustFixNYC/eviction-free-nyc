import React from "react";

const ButtonStep: React.FC<{ stepFn: any; children: React.ReactNode }> = ({
  stepFn,
  children,
}) => (
  <button onClick={stepFn} className="btn btn-steps btn-block btn-centered">
    {children}
  </button>
);

export default ButtonStep;
