export const highlightText = (text, keyword, fontColor = 'white', backgroundColor = 'red') => {
    if (!keyword)
        return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    const listStyle = `color: ${fontColor}; background-color: ${backgroundColor}`;
    const span = parts.map((part) => regex.test(part) ? `<span style="${listStyle}">${part}</span>` : part);
    return span.join('');
};
