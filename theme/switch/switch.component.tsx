import React, { useRef } from 'react';
import styles from './switch.module.scss';

interface switchInterface {
    value: Number,
    setValue: Function,
    titleOne: String,
    titleTwo: String
}

export default function SwitchComponent({value, setValue, titleOne, titleTwo}: switchInterface) {
    const ref = useRef<any>();

    const handleToggle = (VAL:Number) => {
        setValue(VAL)
        if (VAL === 1) {
			ref.current.style.left = '0';
		} else {
			ref.current.style.left = '50%';
		}
    }

	return (
		<div className={styles.main__top__menu}>
			<div className={styles.active} ref={ref}></div>
			<div
				className={
					value === 2
						? styles.main__top__menu__child
						: styles.main__top__menu__child + ' ' + styles.active__menu
				}
				onClick={() => handleToggle(1)}
			>
				<span></span> {titleOne}
			</div>
			<div
				className={
					value === 1
						? styles.main__top__menu__child
						: styles.main__top__menu__child + ' ' + styles.active__menu
				}
				onClick={() => handleToggle(2)}
			>
				<span></span> {titleTwo}
			</div>
		</div>
	);
}
