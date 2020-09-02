import React from "react";

export const DummyComponent = (props: { sampleProp?: boolean }) => (
  <div>{props.sampleProp ? <span>It works!</span> : <></>}</div>
);
