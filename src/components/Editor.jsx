import React,{useState,useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import '../index.css'
import remarkGfm from 'remark-gfm'

const Editor=({mdinput,setmdinput,togglecolormode,togglemdfontsize})=> {

    const toggleinput=(x)=>{
        var y=x.target.value;
        setmdinput(y);
    }
  return (
    <div className='mdeditor'>
        <textarea className='mdinputarea' placeholder='Type some Markdown code here.' style={{
            background:togglecolormode?'#191e2a':'#fff',
            color:togglecolormode?'#fff':'#000',
            border:togglecolormode?'3px solid #fff':'3px solid #000',
            
            minWidth:'40vw',
            maxWidth:'50vw'
        }} name='input' onChange={toggleinput}></textarea>
        <p style={{fontSize:togglemdfontsize}}>
           <ReactMarkdown style={{fontSize:20}} remarkPlugins={([remarkGfm])} className='mddisplay' >{mdinput}</ReactMarkdown> 
        </p>
    </div>
  )
}

export default Editor