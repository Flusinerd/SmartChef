import React from "react";
import SCNavbar from "../navbar/Navbar";
import SCTabbar from "../tabbar/Tabbar";

function SCResponsiveContainer(props: React.HTMLAttributes<HTMLDivElement>) {
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
      {props.children}
      {windowWidth < 992 && (
        <SCTabbar className="fixed bottom-0 left-0 right-0"></SCTabbar>
      )}
    </>
  );
}

export default SCResponsiveContainer;
