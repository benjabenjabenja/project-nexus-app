export const generateUniqueId = function () {
    return `arq-${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
};