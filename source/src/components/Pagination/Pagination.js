import React from "react";
import './Pagination.css'

function Pagination(props) {
    const{pagination, onPageChange} = props;
    const{_page, _limit, _totalRows} = pagination;
    const totalPages = Math.ceil(_totalRows / _limit)

    function handlePageChange(newPage) {
        if(onPageChange) {
            onPageChange(newPage);
        }
    }

    return (
        <div className="paginaton">
            <button disabled={_page <= 1} onClick={() => {handlePageChange(_page - 1)}}><i class="fa-solid fa-chevron-left"></i></button>
            <button disabled={_page >= totalPages} onClick={() => {handlePageChange(_page + 1)}}><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    );
};

export default Pagination