/* eslint-disable @next/next/no-img-element */

import React from 'react'
import styles from './SectionTitleWithIcon.module.scss'

interface SectionTitleWithIconProps  {
    title:string
    icon : string
    style?: object
}

const SectionTitleWithIcon = ({title,icon,style}:SectionTitleWithIconProps) => {

    style = style || {};
   

    return (
        <div style={style} className={styles.titleContainer}> 
        <span className={styles.titleContainer__greenIconBox}>
            <img src={icon} alt="icon" />
        </span>
            <h5>{title}</h5>
		</div>
    )
}

export default SectionTitleWithIcon
