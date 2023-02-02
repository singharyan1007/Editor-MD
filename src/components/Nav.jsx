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
    <div className="m-3 flex overflow-x-auto overflow-y-hidden nav">
      <div className="rounded-lg fixed bottom-3 right-3 p-1 w-7  transition h-8 bg-gray-100 hover:bg-slate-400">
        <a className="!text-slate-300 relative right-1 -top-1 "
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl bg-black shadow-lg !p-5 !text-center pl-auto pr-auto z-10"
      >
        <h1>Upload file</h1>
        <p className="text-sm font-bold">(.md&ensp;.mdx&ensp;.txt)</p>
        <h4 style={{ fontSize: "15px", fontWeight: "normal" }}>
          Doing this will overwrite the file
          <br />
          being edited on this tab
        </h4>

        <div className="block h-10v -z-10">
          <input
            type="file"
            name="file"
            title="upload file"
            onChange={handleupload}
            accept=".txt,.md,.mdx"
          />
          <h6 className="leading-5 relative text-7xl bottom-44 -z-10">
            <BsFileEarmarkArrowUp />
            <h5 className="mt-3 text-xl">
              Drop file headers
              <br />
              or
              <br />
              click to choose
            </h5>
          </h6>
        </div>
        <div style={{ display: "flex" }} className='downloadinput-btn-div'>
          <button
            onClick={() => setUploadWindow(false)}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
            }} className='downloadinput-btn2'
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
        <div className="flex"> 
          <input type="text" onChange={filenametoggle} placeholder="README" className="rounded-md border-solid border-2 border-black relative text-2xl p-1 font-mono focus:!outline-none" />
          <select
            defaultValue={fileType}
            onChange={(x) => setFileType(x.target.value)} className='rounded-md text-xl font-bold p-0 ml-1 border-black border-solid border-2 filetype-input'
          >
            <option selected value="md">
              .md
            </option>
            <option value="mdx">.mdx</option>
            <option value="txt">.txt</option>
          </select>
        </div>
        <div style={{ display: "flex" }} className='mt-2'>
          <button onClick={downloadfile} style={{ marginRight: 10 }} className="rounded-md text-2xl h-10 cursor-pointer border-none p-2 font-bold bg-slate-400 hover:bg-slate-300">
            Download
          </button>
          <button onClick={() => setDownloadWindow(false)} className='text-2xl rounded-md cursor-pointer border-none p-2 transition bg-slate-400 h-10 font-bold hover:bg-slate-200'>Cancel</button>
        </div>
      </div>

      {/* copywright */}
      <div className="fixed z-10 bottom-3 text-base">
        <p>&copy;&thinsp;Editor-md singharyan1007 {new Date().getFullYear()}</p>
      </div>
      <div className="flex text-center text-black">
        <p >
          <BiFontSize />
        </p>

        <button onClick={decrease} className="border-none rounded-md text-4xl cursor-pointer transition bg-gray-400 hover:bg-slate-600 active:bg-red-600">
          <AiOutlineMinus />
        </button>
        <p>{togglemdfontsize}</p>
        <button onClick={increase} className="border-none rounded-md text-4xl cursor-pointer transition bg-gray-400 hover:bg-slate-600 active:bg-red-600">
          <AiOutlinePlus />
        </button>
      </div>
      <div style={{ display: "flex" }} >
        <button onClick={addHash} className='border-none rounded-md text-3xl ml-1 pt-0 pb-0 px-3 pr-3 bg-slate-400 hover:bg-emerald-300 active:bg-slate-800'>#</button>
        <button onClick={addDash} className='border-none rounded-md text-3xl ml-1 pt-0 pb-0 px-3 pr-3 bg-slate-400 hover:bg-emerald-300 active:bg-slate-800'>-</button>
        <button onClick={addStar} className='border-none rounded-md text-3xl ml-1 pt-0 pb-0 px-3 pr-3 bg-slate-400 hover:bg-emerald-300 active:bg-slate-800'>*</button>
      </div>
      <div className="togglecolormode">
        <button title="Toggle colormode" onClick={togglebgcolor} className="border-none rounded-md bg-slate-400 cursor-pointer transition text-xl ml-3 p-1 "> {togglecolormode?<BsFillSunFill/>:<BsFillMoonStarsFill/>}</button>
      </div>
      <button title="Save File" onClick={displayDownload} className="bg-slate-100 rounded-md text-2xl border-none p-1 ml-1 cursor-pointer transition">
                {<BsFileEarmarkArrowDown />}
            </button>
            <button title="Upload File" onClick={displayDownload} className="bg-slate-100 rounded-md text-2xl border-none p-1 ml-1 cursor-pointer transition updatedownload">
                {<BsFileEarmarkArrowUp />}
            </button>
    </div>
  );
};

export default Nav;
