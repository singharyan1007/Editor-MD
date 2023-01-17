import Editor from "./components/Editor";
import "./index.css";
import Nav from "./components/Nav";
import React, { useState, useEffect } from "react";

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage =
    "It looks like you have been editing something. " +
    "If you leave before saving, your changes will be lost.";
  (e || this.window.event).returnValue = confirmationMessage;
  return confirmationMessage;
});

function App() {
  const [togglemdfontsize, settogglemdfontsize] = useState(30);
  const [togglecolormode, settogglecolormode] = useState(getMode);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(togglecolormode));
  }, [togglecolormode]);

  function getMode() {
    const savemode = JSON.parse(localStorage.getItem("dark"));
    return savemode || false;
  }

  const [mdinput, setmdinput] = useState("");
  return (
    <div className="App">
      <Nav
        togglecolormode={togglecolormode}
        settogglecolormode={settogglecolormode}
        togglemdfontsize={togglemdfontsize}
        settogglemdfontsize={settogglemdfontsize}
        mdinput={mdinput}
        setmdinput={setmdinput}
      />

      <Editor
        togglecolormode={togglecolormode}
        settogglecolormode={settogglecolormode}
        togglemdfontsize={togglemdfontsize}
        mdinput={mdinput}
        setmdinput={setmdinput}
      />
    </div>
  );
}

export default App;
