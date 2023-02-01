import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import { AiOutlinePlus, AiOutlineMinus, AiFillGithub } from "react-icons/ai";
import { BiFontSize, BiSleepy } from "react-icons/bi";
import {
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsFileEarmarkArrowUp,
  BsFileEarmarkArrowDown,
} from "react-icons/bs";
import "../index.css";
import axios, { post } from "axios";

const Nav = ({
  togglecolormode,
  settogglemdfontsize,
  togglemdfontsize,
  settogglecolormode,
  setmdinput,
}) => {
  const filenametoggle = (x) => {
    var y = x.target.value;
    var output = y === "" ? "README" : y;
    setFileName(output);
  };

  const textarea = document.querySelector("textarea");
  const body = document.querySelector("body");
  const renameinput = document.querySelector("input");
  const codeblock = document.querySelector("pre");
  const setcolormode = togglecolormode ? "#191e2a" : "#fff";
  const setcolormodetext = togglecolormode ? "#fff" : "#000";

  const [downloadWindow, setDownloadWindow] = useState(false);
  const [uploadWindow, setUploadWindow] = useState(false);
  const [filename, setFileName] = useState("README");
  const [fileType, setFileType] = useState("md");
  //increasing and decreasing the font size
  function increase() {
    settogglemdfontsize((prevCount) =>
      prevCount < 70 ? prevCount + 5 : prevCount + 0
    );
  }
  function decrease() {
    settogglemdfontsize((prevCount) =>
      prevCount > 10 ? prevCount - 5 : prevCount - 0
    );
  }

  //togglebackground color
  function togglebgcolor() {
    settogglecolormode((prevColor) => !prevColor);
  }

  //Adding basic functionalities like hash, star, dash etc
  function addHash() {
    textarea.value += "#";
    textarea.focus();
  }
  function addStar() {
    textarea.value += "*";
    textarea.focus();
  }
  function addDash() {
    textarea.value += "-";
    textarea.focus();
  }
  useEffect(() => {
    body.style.backgroundColor = setcolormode;
    body.style.color = setcolormodetext;
  }, [togglecolormode]);
  function displayDownload() {
    setDownloadWindow((prevState) => !prevState);
    setUploadWindow(false);
    renameinput.focus();
  }
  function displayUpload() {
    setUploadWindow((prevState) => !prevState);
    setDownloadWindow(false);
  }

  function downloadfile() {
    const formData = new FormData();
    const imagefile = document.querySelector("#file");
    formData.append("image", imagefile.files[0]);
    axios.post("upload_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  function handleupload(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      let result = e.target.result;
      setmdinput(result);
      textarea.value = result;
    };
    reader.readAsText(file);
    setUploadWindow(false);
  }
  return (
    <div>
      <div>
        <a
          href="https://github.com/singharyan1007/Editor-MD.git"
          target="_blank"
        >
          <AiFillGithub />
        </a>
      </div>
      <div
        style={{
          display: uploadWindow ? "block" : "none",
          alignItems: "center",
        }}
      >
        <h1>Upload file</h1>
        <p>(.md&ensp;.mdx&ensp;.txt)</p>
        <h4 style={{ fontSize: "15px", fontWeight: "normal" }}>
          Doing this will overwrite the file
          <br />
          being edited on this tab
        </h4>

        <div>
          <input
            type="file"
            name="file"
            title="upload file"
            onChange={handleupload}
            accept=".txt,.md,.mdx"
          />
          <h6>
            <BsFileEarmarkArrowUp />
            <h5>
              Drop file headers
              <br />
              or
              <br />
              click to choose
            </h5>
          </h6>
        </div>
        <div style={{ display: "flex" }}>
          <button
            onClick={() => setUploadWindow(false)}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* download button */}
      <div
        style={{
          display: downloadWindow ? "block" : "none",
          alignItems: "center",
        }}
      >
        <h1>Save file</h1>
        <div>
          <input type="text" onChange={filenametoggle} placeholder="README" />
          <select
            defaultValue={fileType}
            onChange={(x) => setFileType(x.target.value)}
          >
            <option selected value="md">
              .md
            </option>
            <option value="mdx">.mdx</option>
            <option value="txt">.txt</option>
          </select>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={downloadfile} style={{ marginRight: 10 }}>
            Download
          </button>
          <button onClick={() => setDownloadWindow(false)}>Cancel</button>
        </div>
      </div>

      {/* copywright */}
      <div>
        <p>&copy;&thinsp;Editor-md singharyan1007 {new Date().getFullYear()}</p>
      </div>
      <div>
        <p>
          <BiFontSize />
        </p>

        <button onClick={decrease}>
          <AiOutlineMinus />
        </button>
        <p>{togglemdfontsize}</p>
        <button onClick={increase}>
          <AiOutlinePlus />
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={addHash}>#</button>
        <button onClick={addDash}>-</button>
        <button onClick={addStar}>*</button>
      </div>
      <div>
        <button title="Toggle colormode" onClick={togglebgcolor}>{togglecolormode?<BsFillSunFill/>:<BsFillMoonStarsFill/>}</button>
      </div>
      <button title="Save File" onClick={displayDownload} className="download-btn">
                {<BsFileEarmarkArrowDown />}
            </button>
            <button title="Upload File" onClick={displayDownload} className="download-btn update">
                {<BsFileEarmarkArrowUp />}
            </button>
    </div>
  );
};

export default Nav;
