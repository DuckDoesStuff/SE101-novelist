import React, { useState, useEffect } from 'react'
import { emptyChapter, getChapter, pushChapter, genChapterKey, deleteChapter } from '../../backend-api/API';


import './EditChapter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { message } from "antd";



const EditChapter = (props) => {
  const [untitledChapter, setUntitledChapter] = useState(0);
  const [chapterInfo, setChapterInfo] = useState([]);

  const [messageApi, notificationHolder] = message.useMessage();
  const uploadMessage = (content, type, duration) => {
    messageApi.destroy();
    messageApi.open({
      content: content,
      type: type,
      duration: duration,
      style: {
        marginTop: '20px',
      }
    })
  }

  useEffect(() => {
    if (props.loading === true) return;

    const fetchChapters = async () => {
      const fetchedChapters = [];
  
      for (const id of props.chapterID) {
        const chapter = await getChapter(id);
        fetchedChapters.push(chapter);
      }
  
      setChapterInfo([...chapterInfo, ...fetchedChapters]);
    };
  
    fetchChapters();
  }, [props.loading])


  // Runs when parent component submitChapter is true
  useEffect(() => {
    if(props.submitChapter === false) return;
    // console.log(chapterInfo)
    chapterInfo.map((chapter) => {
      if(chapter.id !== "" && chapter.content !== "" && chapter.title !== "") {
        pushChapter(chapter, chapter.id)
      }
      return 1;
    })
    // window.location.reload(); should go to the previous page instead
  }, [props.submitChapter])

  const handleNewChapter = () => {
    if(untitledChapter > 0) {
      uploadMessage("There are chapters without content or title", "error", 2);
      return;
    }
    var newChapter = emptyChapter();
    newChapter.id = genChapterKey();
    newChapter.title = "Untitled";
    newChapter.novel_id = props.novelID;
    newChapter.content = "";
    newChapter.like = 0;
    newChapter.view = 0;

    setChapterInfo([...chapterInfo, newChapter]);
    setUntitledChapter(untitledChapter + 1);
  }

  const EditButton = ({onClick}) => {
    return (
      <div className='edit-button' onClick={onClick}>
        <FontAwesomeIcon icon={faPen} color='white'/>
      </div>
    )
  }

  const DeleteButton = ({onClick}) => {
    return (
      <div className='delete-button' onClick={onClick}>
        <FontAwesomeIcon icon={faTrashCan} color='white'/>
      </div>
    )
  }

	const ChapterItem = (props) => {
    const handleClickSave = () => {
      // Perform title and content check
      if(title === "") {
        uploadMessage("Chapter title cannot be empty", "error", 2);
        return;
      }
      if(content === "") {
        uploadMessage("Chapter content cannot be empty", "error", 2);
        return;
      }
      const copyChapterInfo = [...chapterInfo]
      copyChapterInfo[props.index].title = title;
      copyChapterInfo[props.index].content = content;
      setChapterInfo(copyChapterInfo);
      setUntitledChapter(untitledChapter - 1);
      // Check if the ID is already in the list or not
      props.setChapterID(prevChapterIDs => {
        if (!prevChapterIDs.includes(props.id)) {
          return [...prevChapterIDs, props.id];
        }
        return prevChapterIDs;
      });
    }
    
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    const [edit, setEdit] = useState(false);
    const handleClickEdit = () => {
      setEdit(!edit);
      setTitle(props.title);
      setContent(props.content);
    }

    const handleClickDelete = () => {
      if(props.title === "Untitled") {
        setChapterInfo(chapterInfo.filter((chapter) => chapter.id !== props.id));
        props.setChapterID(props.chapterID.filter((id) => id !== props.id));
        setUntitledChapter(untitledChapter - 1);
      }else {
        deleteChapter(props.id, props.novelID)
        .then(() => {
          setChapterInfo(chapterInfo.filter((chapter) => chapter.id !== props.id));
          props.setChapterID(props.chapterID.filter((id) => id !== props.id));
  
          uploadMessage("Chapter deleted", "success", 2);
  
  
        })}
    }

		return (
			<div className='chapter-item'>
        {notificationHolder}
        <div className='chapter-hor'>
          <p style={{marginLeft: '0px'}}>Chapter {props.index + 1}: {props.title}</p>
          <div>
            {!edit ?
            <div className='save-cancel-button-group'>
              <EditButton onClick={handleClickEdit}/>
              <DeleteButton onClick={handleClickDelete}/></div>
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
                maxLength={50}
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

  const voTriButton = () => {
    console.log(chapterInfo)
    console.log(props.chapterID)
    // chapterInfo.map((chapter) => {
    //   if(chapter.id !== "" && chapter.content !== "" && chapter.title !== "") {
    //     pushChapter(chapter, chapter.id)
    //   }
    // })
  }

  return (
	<div className='edit-chapter'>
    <h2>Chapters</h2>
    <Button children='New chapter' onClick={handleNewChapter}/>
    <Button children='Vo tri' onClick={voTriButton}/>
    {chapterInfo.length === 0 ? <p className="message-text">No chapter yet</p> : 
    <>
      {chapterInfo.map((chapter, index) => (
        <ChapterItem  key={chapter.id} 
                      id={chapter.id}
                      index={index} 
                      title={chapter.title} 
                      content={chapter.content} 
                      novelID={props.novelID}
                      setChapterID={props.setChapterID}
                      chapterID={props.chapterID}/>
      ))}
    </>}

	</div>
  )
}

export default EditChapter
