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
    <div className='flex'>
        <textarea className='p-3.5 text-xs rounded-3xl mx-1 mr-4 transition focus:!outline-none !border-2 !border-stone-700' placeholder='Type some Markdown code here.' style={{
            background:togglecolormode?'#191e2a':'#fff',
            color:togglecolormode?'#fff':'#000',
            border:togglecolormode?'3px solid #fff':'3px solid #000',
            height:'80vh',
            minWidth:'40vw',
            maxWidth:'50vw'
        }} name='input' onChange={toggleinput}></textarea>
        <p style={{fontSize:togglemdfontsize}}>
           <ReactMarkdown style={{fontSize:20}} remarkPlugins={([remarkGfm])} className='overflow-auto rounded-xl p-3 mr-1 leading-auto max-w-50v h-80v' >{mdinput}</ReactMarkdown> 
        </p>
    </div>
  )
}

export default Editor