import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './TableBody';

const Table = ({ columns, sortColumn, onSort, data }) => {
    //here we have used destructuring in the parameters itself
    return (
        <table className='table'>
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />

            <TableBody columns={columns} data={data} />
        </table>
    );
};

export default Table;
