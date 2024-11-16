
export const formatDate = (date: string) => {
    date = date.split('T')[0];
    // replace '-' with '.'
    date = date.replace(/-/g, '.');
    // reformat MM.DD.YYYY
    date = date.split('.').slice(1).concat(date.split('.')[0]).join('.');
    return date;
}