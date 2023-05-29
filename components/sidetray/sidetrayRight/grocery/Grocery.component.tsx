/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './grocery.module.scss';
import ArrowBackIcon from '../../../../public/icons/arrow_back_black_36dp.svg';

export default function GroceryComponent(props: any) {
	return (
		<div className={styles.grocery}>
			<div className={styles.grocery__head}>
				<ArrowBackIcon />
				<p>Ingredient</p>
			</div>
            <div className={styles.groceries}>
				<div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>kale</p>
				</div>
				<div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>Kollard</p>
				</div>
				<div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>Spinach</p>
				</div>
				<div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>Dandelion</p>
				</div>
                <div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>kale</p>
				</div>
				<div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>Kollard</p>
				</div>
                <div className={styles.item}>
					<div className={styles.image}>
						<img src="/other/cabbage.png" alt="" />
					</div>
                    <p>kale</p>
				</div>
			</div>
		</div>
	);
}
