// import React, { useState } from "react";
// import "./Accordion.css";
// import DropArrow from "./dropArrow.svg";

// const SCAccordion = (props: SCAccordionProps) => {
//   const [show, setShow] = useState(false);
//   const open = () => {
//     setShow(!show);
//   };

//   return (
//     <div className="accordion-header" onClick={open}>
//       {`${props.title}   `}
//       {show ? <img  src={DropArrow} alt="DropArrow"/> : <img style={{transform: 'rotate(180deg)'}} src={DropArrow} alt="DropArrow"/>}
//       <div className="accordion-body">{show && props.children}</div>
      
//     </div>
//   );
// };

// export default SCAccordion;


import React, { useState } from "react";
import styles from "./Accordion.module.css";
import Chevron from "./chevron.svg";

const SCAccordion = ({ title, children } : SCAccordionProps) => {
  const [show, setShow] = useState(false);

  const showContent = () => {
    setShow(!show);
  };

  return (
    <div className={styles.accordionWrapper}>
      <div
        className={styles.accordionTitle}
        onClick={showContent}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.action}>
          <img src={Chevron} alt="chevron" className={show ? styles.rotate : undefined} />
        </div>
      </div>
      {show && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

export default SCAccordion;


export interface SCAccordionProps {
  title?: string;
  children: React.ReactNode;
}
