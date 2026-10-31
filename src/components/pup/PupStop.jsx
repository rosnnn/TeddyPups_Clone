import React from 'react';
import PupBuddy from './PupBuddy';

export function PupStop({
  pose = "sit",
  facing = "right",
  act,
  behind = false,
  lane = false,
  className = "",
  style,
  label
}) {
  return (
    <div
      data-pup-stop="true"
      data-pose={pose}
      data-facing={facing}
      data-act={act}
      data-behind={behind || undefined}
      data-lane={lane || undefined}
      className={`pup-stop ${className}`}
      style={style}
    >
      <PupBuddy pose={pose} facing={facing} label={label} asStop={true} />
    </div>
  );
}

export default PupStop;
