import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = props => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    //[1....pagesCount].map()
    if (pagesCount === 1) return null; //No pagination if only one page
    const pages = _.range(1, pagesCount + 1);
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pages.map(page => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? 'page-item active'
                                : 'page-item'
                        }
                    >
                        <span
                            onClick={() => onPageChange(page)}
                            className="page-link"
                        >
                            {page}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
