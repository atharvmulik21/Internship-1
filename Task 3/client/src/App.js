import React from "react"
import Editor from "./Editor"

function App(){
  const documentId = "12345"

  return (
    <div>
      <Editor documentId={documentId}/>
    </div>
  )
}

export default App