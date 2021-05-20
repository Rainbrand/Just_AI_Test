import React, { FC } from 'react';
import { IHighlightedTextProps } from '../types/types';

/**
 * Copmponents with passed text highlighting.
 * @param text: string - text to be highlighted
 * @param highlight: string - pattern to highlight
 * @constructor
 */
const HighlightedText: FC<IHighlightedTextProps> = ({text, highlight}) =>{
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (<span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>);
}

export default HighlightedText
