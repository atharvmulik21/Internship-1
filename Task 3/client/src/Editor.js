import React,{useEffect,useState} from "react"
import { io } from "socket.io-client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const socket = io("http://localhost:3001")

function Editor({documentId}){

  const [value,setValue] = useState("")

  useEffect(()=>{

    socket.emit("get-document",documentId)

    socket.on("load-document",data=>{
      setValue(data)
    })

  },[documentId])

  useEffect(()=>{

    socket.on("receive-changes",delta=>{
      setValue(delta)
    })

  },[])

  const handleChange = (content)=>{
    setValue(content)
    socket.emit("send-changes",content)
  }

  return(
    <div style={{width:"800px",margin:"50px auto"}}>
      <h2>Collaborative Document Editor</h2>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
      />

    </div>
  )
}

export default Editor