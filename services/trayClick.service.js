export const handleFilterClick = (arr, obj) => {
    let blendz = [];
    let present = false;
    arr.forEach((blen) => {
        if (blen === obj) {
            present = true;
        }
    });
    if (!present) {
        blendz = [ obj, ...arr];
    } else {
        blendz = arr.filter((blen) => {
            return blen !== obj;
        });
    }
    return blendz;
};