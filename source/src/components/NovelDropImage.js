import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { uploadImage } from '../backend-api/API'
import '../styles/NovelDropImage.css'

const NovelDropImage = (handleDrop) => {
  // This part should be at the edit novel view and not here, we then parse in the handleDrop
  // const [selectedFile, setSelectedFile] = useState(null);
  // const handleDrop = (acceptedFiles) => {
  //   // Set the selected file first then after hitting 'Save' we will upload
  //   setSelectedFile(acceptedFiles[0]);
  // }
  // const handleSave = () .........etc

  return (
    <Dropzone onDrop={handleDrop} maxFiles={1} accept={{'image/png':['.png'], 'image/jpeg':['.jpg']}}>
      {({getRootProps, getInputProps, isDragActive}) => (
          <section className="novel-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive ? (
                <p>Drag 'n' drop or click to select your thumbnail</p>
              ):(
                <p>Drag your thumbnail here</p>
              )}
            </div>
          </section>
        )}
    </Dropzone>
  )
}

export default NovelDropImage
