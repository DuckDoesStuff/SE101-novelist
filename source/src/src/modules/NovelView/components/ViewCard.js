import React, { useState } from 'react';
import './ViewCard.css';
import thumbnail from './thumbnail.jpg'
import avatar from './avatar.jpg'
import Button from '../../../components/Button/Button';
import Pagination from '../../../components/Pagination/Pagination';

// const fakeNovel = () => {
// 	return {
// 		id: "Novel01",
// 		title: "This is a fake novel",
// 		thumbnail: "thumbnail.jpg",
// 		genre: ["Fiction"],
// 		status: "public",
// 		description: "Lorem ipsum dolor sit amet consectetur. Quis eu tincidunt commodo a congue facilisis risus odio. Ut sagittis egestas et pellentesque mi quam lectus vel. Nibh vulputate eros pretium tincidunt nulla non ultrices euismod. Leo gravida suspendisse egestas bibendum. Euismod lacus dignissim viverra arcu magnis tortor eget porttitor. Iaculis nullam ut commodo egestas pellentesque. Facilisi pellentesque eu libero non eu lacus scelerisque diam. Cursus blandit mauris morbi vitae auctor. Porttitor natoque vitae at fames. Turpis feugiat diam auctor nec. Dui sit orci tincidunt elit id aenean.",
// 		like: 1000,
// 		view: 1000
// 	}
// }


const ViewCard = () => {
    const[pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 36,
    });
    
    return (
        <div className='ViewCardContainer'>
            <div className='ViewCardInteract'>
                <img src={thumbnail} alt='test image'></img>
                <div className='ViewCardButton'>
                    <Button>READ</Button>
                    <div className='ViewCardButtonInteract'>
                        <Button><i class="fa-regular fa-heart"></i>Like</Button>
                        <Button><i class="fa-regular fa-share-from-square"></i>Share</Button>
                    </div>
                </div>
            </div>

            <div className='ViewCardInfoContainer'>
                <div className='ViewCardInfoList'>
                    <p className='title'>Title</p>
                    <div className='author'>
                        <img src={avatar} alt='avatar'></img>
                        <p>Author</p>
                    </div>
                    <div className='GenreList'>
                        <p className='genre'>Genre 1</p>
                        <p className='genre'>Genre 2</p>
                        <p className='genre'>Genre 3</p>
                    </div>
                    <p className='script'>Lorem ipsum dolor sit amet consectetur. Quis eu tincidunt commodo a congue facilisis risus odio. Ut sagittis egestas et pellentesque mi quam lectus vel. Nibh vulputate eros pretium tincidunt nulla non ultrices euismod. Leo gravida suspendisse egestas bibendum. Euismod lacus dignissim viverra arcu magnis tortor eget porttitor. Iaculis nullam ut commodo egestas pellentesque. Facilisi pellentesque eu libero non eu lacus scelerisque diam. Cursus blandit mauris morbi vitae auctor. Porttitor natoque vitae at fames. Turpis feugiat diam auctor nec. Dui sit orci tincidunt elit id aenean. Lorem ipsum dolor sit amet consectetur. Quis eu tincidunt commodo a congue facilisis risus odio. Ut sagittis egestas et pellentesque mi quam lectus vel. Nibh vulputate eros pretium tincidunt nulla non ultrices euismod. Leo gravida suspendisse egestas bibendum. Euismod lacus dignissim viverra arcu magnis tortor eget porttitor. Iaculis nullam ut commodo egestas pellentesque. Facilisi pellentesque eu libero non eu lacus scelerisque diam. Cursus blandit mauris morbi vitae auctor. Porttitor natoque vitae at fames. Turpis feugiat diam auctor nec. Dui sit orci tincidunt elit id aenean.</p>
                </div>
                <div className='NovelReact'>
                    <div className='react'><i class="fa-solid fa-heart"></i>1000</div>
                    <div className='react'><i class="fa-solid fa-share"></i>1000</div>
                </div>
            </div>

            <div className='ViewCardChaperList'>
                <p>Chapters</p>
                <ul>
                    <li>Chapter 1</li>
                    <li>Chapter 2</li>
                    <li>Chapter 3</li>
                    <li>Chapter 4</li>
                    <li>Chapter 5</li>
                    <li>Chapter 6</li>
                    <li>Chapter 7</li>
                    <li>Chapter 8</li>
                    <li>Chapter 9</li>
                    <li>Chapter 10</li>
                </ul>
                <div className='pagination'>
                    <Pagination pagination={pagination}></Pagination>
                </div>
            </div>
        </div>

    );
};

export default ViewCard