/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './title.module.scss';

export default function TitleComponent({type, text, style, textStyle, icon}) {
     // STEP 1: CHECK VALUE TYPES
     if(style && typeof style !== 'object'){
        console.log('Argument style expects object as value')
        style = null
    }

    style = style || {};
    textStyle = textStyle || {};
    text = text || 'Wiki Highlight';

    if(type === 'icon') return (
        <div style={style} className={styles.title}>
            <img src={icon} alt="icon" />
            <h2 style={textStyle}>{text}</h2>
        </div>
    )

    return(
        <div style={style} className={styles.title}>
            <h2 style={textStyle}>{text}</h2>
        </div>
    )
}
