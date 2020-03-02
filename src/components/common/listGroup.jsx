import React from 'react';

const ListGroup = props => {
    const {
        items,
        textProperty,
        valueProperty,
        onItemSelect,
        selectedItem
    } = props;
    //we use textProperty and valueProperty so that we don't restrict ourselves to just _id and name properties of item. This component should be generalized if we want to reuse it
    return (
        <ul className='list-group'>
            {/* use square bracket to access the properties of item */}
            {items.map(item => (
                <li
                    onClick={() => onItemSelect(item)}
                    key={item[valueProperty]}
                    className={
                        item === selectedItem
                            ? 'list-group-item active'
                            : 'list-group-item'
                    }
                >
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default ListGroup;
