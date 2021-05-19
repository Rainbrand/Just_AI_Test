import React, { FC } from 'react';
import { IHighlightedTextProps } from '../types/types';


const HighlightedText: FC<IHighlightedTextProps> = ({text, highlight}) =>{
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (<span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>);
}

export default HighlightedText
