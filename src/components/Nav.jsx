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
        <a href="" target="_blank"><AiFillGithub/></a>
      </div>
    </div>
  );
};

export default Nav;
