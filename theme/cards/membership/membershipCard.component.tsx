import React from 'react';
import { Interface } from 'readline';
import ButtonComponent from '../../button/button.component';
import styles from './membership.module.scss';

interface memberCardInterface {
	title: string,
	price: number,
	period: string,
	detailList: Array<string>,
	click: Function
}

export default function MembershipcardComponent({
	title,
	price,
	period,
	detailList,
	click
}) {

	const handleClick = () => {
		// Hnalde Clixk here
		click && click()
	}
	return (
		<div className={styles.card}>
			<div className={styles.card__top}>
				<h2>{title}</h2>
			</div>
			<div className={styles.pricing}>
				${price} <span>/{period}</span>
			</div>
			<div className={styles.middle} onClick={handleClick}>
				<ButtonComponent
					value="Select Plan"
					type={'transparentHover'}
					style={{
						height: '45px',
						border: '1px solid #ECECEC',
						fontSize: '15px',
					}}
					fullWidth={0}
					width={0}
				/>
			</div>
			<div className={styles.bottom}>
				<ul>
					{detailList &&
						detailList.map((list: string, i: number) => (
							<li key={'F0' + list + i}>{list}</li>
						))}
				</ul>
			</div>
		</div>
	);
}
