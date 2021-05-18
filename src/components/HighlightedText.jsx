import React from 'react';

const HighlightedText: FC = ({text, highlight} : {text: string, highlight: string}) =>{
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (<span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>);
}

export default HighlightedText
