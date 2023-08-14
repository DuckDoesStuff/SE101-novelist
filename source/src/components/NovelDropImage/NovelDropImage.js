import React from 'react';
import Dropzone from 'react-dropzone';
import './NovelDropImage.css';
import styles from './NovelDropImage.module.css';

const NovelDropImage = (props) => {
  const focusedStyle = {
    backgroundColor: '#57C2AE',
  };

  return (
    <Dropzone
      onDrop={props.onDrop}
      maxFiles={1}
      accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg'] }}
      noClick={true}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div className={`novel-drop-zone ${styles[props.className]}`}
          style={isDragActive ? focusedStyle : {}}
          {...getRootProps()}>
          <input {...getInputProps()} />
          <section>
            <div>
              {!isDragActive ? (
                <>
                  {props.img ? (
                    <img src={props.img} alt="preview" className="preview-image" />
                  ) : (
                    <p>Drag and drop to select your thumbnail</p>
                  )}
                </>
                
              ) : (
                <p>Drop your thumbnail here</p>
              )}
            </div>
          </section>
        </div>
      )}
    </Dropzone>
  );
};

export default NovelDropImage;
