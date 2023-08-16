import React from 'react'
import './EditChapter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const EditChapter = (props) => {
  const EditButton = () => {
    return (
      <div className='edit-button'>
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

	const ChapterItem = () => {
		return (
			<div className='chapter-item'>     
        <p style={{marginLeft: '20px'}}>Chapter 1</p>    
        <div className='buttons'>
          <EditButton/>
          <DeleteButton/>
        </div>
      </div>
		)
	}

  return (
	<div className='edit-chapter'>
    <h2>Chapters</h2>
	  <ChapterItem/>
	</div>
  )
}

export default EditChapter
