import React, { useState } from 'react'
import './EditChapter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const EditChapter = (props) => {
  const EditButton = ({onClick}) => {
    return (
      <div className='edit-button' onClick={onClick}>
        <FontAwesomeIcon icon={faPen} color='white'/>
      </div>
    )
  }

  const DeleteButton = () => {
    return (
      <div className='delete-button'>
        <FontAwesomeIcon icon={faTrashCan} color='white'/>
      </div>
    )
  }

	const ChapterItem = (props) => {
    const handleClickSave = () => {
      console.log(title)
      console.log(content)
    }
    
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    const [edit, setEdit] = useState(false);
    const handleClickEdit = () => {
      setEdit(!edit);
      setTitle(props.title);
      setContent(props.content);
    }
		return (
			<div className='chapter-item'>
        <div className='chapter-hor'>
          <p style={{marginLeft: '0px'}}>Chapter {props.count}: {props.title}</p>
          <div>
            {!edit ?
            <div className='save-cancel-button-group'>
              <EditButton onClick={handleClickEdit}/>
              <DeleteButton/></div>
            :
            <div className='save-cancel-button-group'>
              <Button children='Save' onClick={handleClickSave}/>
              <Button children='Cancel' onClick={handleClickEdit}/></div>
            }
          </div>
        </div> 

        {edit ? <ChapterInput title={title} 
                              handleTitle={setTitle} 
                              content={content} 
                              handleContent={setContent}/> : <></>}  
      </div>
		)
	}

  const ChapterInput = (props) => {
    const title = typeof (props.title) === "string" ? props.title : "";
    const content = typeof (props.content) === "string" ? props.content : "";
    return (
      <div className='chapter-input'>
        <input  type='text' 
                placeholder='Chapter title' 
                className='input-box'
                maxLength={30}
                value={title === "Untitled" ? "" : title}
                onChange={(e) => props.handleTitle(e.target.value)}/>
        <textarea type='text' 
                  placeholder='Chapter content' 
                  className='input-box'
                  style={{ height: "400px" }}
                  maxLength={10000}
                  value={content}
                  onChange={(e) => props.handleContent(e.target.value)}/>
      </div>
    )
  }

  return (
	<div className='edit-chapter'>
    <h2>Chapters</h2>
    {props.chapterInfo.length == 0 ? <p className="message-text">There is no chapter</p> : 
    <>
      {props.chapterInfo.map((chapter, index) => (
        <ChapterItem count={index+1} title={chapter.title} content={chapter.content} saveChapterInfo={props.saveChapterInfo}/>
      ))}
    </>}

	</div>
  )
}

export default EditChapter
