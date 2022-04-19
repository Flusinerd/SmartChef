import React,{useState} from 'react'
import "./Accordion.css"

const Accordion = ( props: SCAccordion ) => {
  const [show,setShow] = useState(false);
  const open = () => {
   setShow(!show)  
  };


  return (
    
    <div className="accordion-header" onClick={open}>
      {props.title}
      <div>
        {show && props.children}
      </div>
    </div>
  )
}


export default Accordion

export interface SCAccordion {
  title?: string;
  children: React.ReactNode;
} 