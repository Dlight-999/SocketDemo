import React from "react";

function App() {
  return (
    <>
      <div className=" bg-slate-900 text-white h-screen flex flex-col items-center justify-between">
        <div className="msg bg-slate-600 p-5 w-full h-full overflow-auto">
          All messages are displayed here
        </div>
        <div className="func flex justify-between w-full">
          <div className="input w-full">
            <input type="text" name="msg" id="msg" className="w-full h-full" />
          </div>
          <div className="btn">
            <button className="h-full w-full p-3">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
