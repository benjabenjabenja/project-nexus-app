export const generateUniqueId = function (i=0) {
    return `arq-${new Date().getTime()}${Math.floor(Math.random() * 1000)}${i}`;
};