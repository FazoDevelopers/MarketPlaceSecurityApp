import React, { useState, useEffect } from "react";

const App = () => {
  const [socket, setSocket] = useState(null);
  const divRef = React.useRef(null);
  const timeouts = {};

  useEffect(() => {
    const newSocket = new WebSocket("ws://192.168.254.150:5000");

    setSocket(newSocket);

    newSocket.addEventListener("open", (event) => {
      console.log("Connected to the WebSocket");
    });

    newSocket.addEventListener("message", (event) => {
      console.log("Received data:", event.data);

      try {
        const jsonData = JSON.parse(event.data);
        console.log("Parsed data:", jsonData);
        if (divRef.current) {
          divRef.current.innerHTML += `<h1>${jsonData.first_name}</h1>`;
          const timeout = setTimeout(() => {
            if (divRef.current && divRef.current.firstChild) {
              divRef.current.removeChild(divRef.current.firstChild);
            }
          }, 10000);
          timeouts[jsonData.id] = timeout;
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

    divRef.current.addEventListener("childremove", (event) => {
      const jsonDataId = event.target.firstChild.id;
      clearTimeout(timeouts[jsonDataId]);
      delete timeouts[jsonDataId];
    });

    return () => {
      newSocket.close();
      for (const timeoutId in timeouts) {
        clearTimeout(timeouts[timeoutId]);
      }
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
