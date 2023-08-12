import React from 'react'
import Dropzone from 'react-dropzone'
import './NovelDropImage.css'
import styles from './NovelDropImage.module.css'

const NovelDropImage = (props) => {
  return (
    <Dropzone onDrop={props.onDrop} 
              maxFiles={1} 
              accept={{'image/png':['.png'], 'image/jpeg':['.jpg']}}
              noClick={true}>
      {({getRootProps, getInputProps, isDragActive}) => (
          <section className={`novel-drop-zone ${styles[props.className]}`}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive ? (
                <p>Drag and drop to select your thumbnail</p>
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
