import React, { useState } from "react";
import "./Accordion.css";
import DropArrow from "./dropArrow.svg";

const SCAccordion = (props: SCAccordionProps) => {
  const [show, setShow] = useState(false);
  const open = () => {
    setShow(!show);
  };

  return (
    <div className="accordion-header" onClick={open}>
      {`${props.title}   `}
      {show ? <img  src={DropArrow} alt="DropArrow"/> : <img style={{transform: 'rotate(180deg)'}} src={DropArrow} alt="DropArrow"/>}
      <div className="accordion-body">{show && props.children}</div>
      
    </div>
  );
};

export default SCAccordion;

export interface SCAccordionProps {
  title?: string;
  children: React.ReactNode;
}
