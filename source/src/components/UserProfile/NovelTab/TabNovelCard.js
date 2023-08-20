import React from 'react';
import './TabNovelCard.css';
import NovelCard from '../../NovelCard'
import Button from '../../Button/Button';

const TabNovelCard = ( {novel, onClick }) => {
    return (
        <div className='TabNovelCardContainer'>
            <NovelCard novel={novel} onClick={onClick}/>
            <div className='overlay'>
                <Button><i class="fa-solid fa-pen-to-square"></i> Edit</Button>
                <Button><i class="fa-solid fa-trash"></i> Delete</Button>
            </div>
        </div>
    );
};

export default TabNovelCard