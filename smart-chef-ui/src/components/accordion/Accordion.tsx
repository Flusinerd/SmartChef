import React, { useState } from "react";
import styles from "./Accordion.module.css";
import Chevron from "./chevron.svg";

const SCAccordion = (props: SCAccordionProps) => {
  const { title,children} = props;
  const [show, setShow] = useState(false);

  const showContent = () => {
    setShow(!show);
  };

  return (
    <div className={styles.accordionWrapper}>
      <div
        className={styles.accordionTitle}
        onClick={showContent}
        data-cy="accordion-click"
      >
        <div className={styles.title} data-cy="accordion-title">{title}</div>
        <div className={styles.action}>
          <img src={Chevron} alt="open" className={show ? styles.rotate : undefined} />
        </div>
      </div>
      {show && <div className={styles.accordionContent} data-cy="accordion-content">{children}</div>}
    </div>
  );
};

export default SCAccordion;


export interface SCAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}
