
export const formatDate = (date: string) => {
    date = date.split('T')[0];
    // replace '-' with '.'
    date = date.replace(/-/g, '.');
    // reformat MM.DD.YYYY
    date = date.split('.').slice(1).concat(date.split('.')[0]).join('.');
    return date;
}

const getTime = (date: string) => {
    // include HH:MM:SS:MS
    return date.split('T')[1];
}

export const generateHash = async (userId: string, date: Date) => {
    const formattedDate = getTime(date.toISOString());
    const userIdAndDate = userId + formattedDate;
    let hash = 0;

    for (let i = 0; i < userIdAndDate.length; i++) {
        let chr = userIdAndDate.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    const formattedHash = Math.abs(hash).toString().slice(0, 5);
    return parseInt(formattedHash, 10);
}