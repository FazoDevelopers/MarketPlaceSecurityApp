// import { RecoilRoot } from "recoil";
// import AdminMain from "./pages/AdminMain";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function App() {
//   return (
//     <RecoilRoot>
//       <div style={{ minHeight: "85vh" }} className="px-3">
//         <AdminMain />
//       </div>
//       <ToastContainer />
//     </RecoilRoot>
//   );
// }

import React, { useState, useEffect } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const divRef = React.useRef(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://192.168.1.122:8000");

    setSocket(newSocket);

    newSocket.addEventListener("open", (event) => {
      console.log("Connected to the WebSocket");
    });

    newSocket.addEventListener("message", (event) => {
      console.log("Received data:", event.data);

      try {
        const jsonData = JSON.parse(event.data);
        console.log("Parsed data:", jsonData);

        // **Correction:** Add a check to make sure that divRef.current is not null before setting its innerHTML.
        if (divRef.current) {
          divRef.current.innerHTML += jsonData.first_name;

          // **New code:**
          // Create a new timeout for each jsonData to hide the first child of the divRef element after 5s
          const timeout = setTimeout(() => {
            if (divRef.current && divRef.current.firstChild) {
              divRef.current.removeChild(divRef.current.firstChild);
            }
          }, 5000);

          // Store the timeout in the jsonData object so that it can be cleared when the jsonData is removed from the divRef element
          jsonData.timeout = timeout;
        }
      } catch (error) {
        console.log("Data received is not JSON:", event.data);
      }
    });

    newSocket.addEventListener("close", (event) => {
      console.log("WebSocket closed:", event);
    });

    newSocket.addEventListener("error", (event) => {
      console.error("WebSocket Error:", event);
    });

    // **New code:**
    // Remove the first child of the divRef element when a jsonData object is removed from the divRef element
    divRef.current.addEventListener("childremove", (event) => {
      const jsonData = event.target.firstChild.jsonData;
      clearTimeout(jsonData.timeout);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className="text-white">
      <h1>WebSocket Component</h1>
      <div ref={divRef}></div>
    </div>
  );
};

export default App;
