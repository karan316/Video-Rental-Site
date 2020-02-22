import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize; //starting index of items on page pageNumber
    // _.slice(items,startIndex)//slices the array from startIndex
    // _.take();
    // to call these methods using a chain convert items array into lodash wrapper
    return _(items)
        .slice(startIndex) //slice according to the starting index
        .take(pageSize) //get pagesize(i.e 4 here) movies from the array
        .value(); //converts into a normal array
}
