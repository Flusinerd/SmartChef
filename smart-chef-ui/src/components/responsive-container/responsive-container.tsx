import React from "react";
import SCNavbar from "../navbar/Navbar";
import SCTabbar from "../tabbar/Tabbar";

function SCResponsiveContainer(props: SCResponsiveContainerProps) {
  const { children, pageTitle } = props;

  // Watch for changes in the window size
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Update the window width when the window is resized
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(windowWidth);
    };

    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      {windowWidth >= 992 && <SCNavbar></SCNavbar>}
      {windowWidth < 992 && pageTitle && (
        <div className="h-14 bg-white drop-shadow flex justify-center items-center">
          <h1 className="align-middle m-0">{pageTitle}</h1>
        </div>
      )}
      {children}
      {windowWidth < 992 && (
        <SCTabbar className="fixed bottom-0 left-0 right-0"></SCTabbar>
      )}
    </>
  );
}

export default SCResponsiveContainer;

export type SCResponsiveContainerProps = {
  children?: React.ReactNode;
  pageTitle?: string;
};
