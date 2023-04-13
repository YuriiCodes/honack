import React from "react";


interface SelectTimeFrameProps {
  setNumOfDays: React.Dispatch<React.SetStateAction<number>>;
}
const SelectTimeFrame = ({setNumOfDays}: SelectTimeFrameProps) => {
  return (
    <select className="select select-bordered w-64 mb-5" onChange={(e) => {
      setNumOfDays(+e.target.value);
    }
    }>
      <option disabled selected>Pick the desired timeframe</option>
      <option value={1}>1 day</option>
      <option value={7}>7 days</option>
      <option value={15}>15 days</option>
      <option value={30}>30 days</option>
      <option value={60}>60 days</option>
      <option value={90}>90 days</option>
    </select>
  )
}

export default SelectTimeFrame;
