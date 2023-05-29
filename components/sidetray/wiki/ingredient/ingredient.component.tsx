/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import DropdownTwoComponent from '../../../../theme/dropDown/dropdownTwo.component';
import WikiTray from '../wikiTray.component';
import styles from './ingredient.module.scss';

export default function IngredientTrayComponent({ title }) {
	const options = ['All', 'two', 'three'];
	const [toggle, setToggle] = useState('one');
	const defaultOption = options[0];

	const categories = ['Leafy Green', 'Collard'];
	const defOption = categories[0];

	const onChange = () => {};

	const UiOne = () => (
		<div className={styles.uiOne}>
			<DropdownTwoComponent list={[]} />
			<div className={styles.nutrition__menu}>
				<div className={styles.nutrition__menu__item}>
					<div className={styles.nutrition__menu__item__image}>
						<img src="/food/chard.png" alt="ingr" />
					</div>
					<p>Ingredients</p>
				</div>
				<div className={styles.nutrition__menu__item}>
					<div className={styles.nutrition__menu__item__image}>
                    <img src="/food/kale.png" alt="ingr" />
					</div>
					<p>Nutrition</p>
				</div>
				<div className={styles.nutrition__menu__item}>
					<div className={styles.nutrition__menu__item__image}>
                    <img src="/food/Dandelion.png" alt="ingr" />
					</div>
					<p>Health</p>
				</div>
                <div className={styles.nutrition__menu__item}>
					<div className={styles.nutrition__menu__item__image}>
                    <img src="/food/spinach.png" alt="ingr" />
					</div>
					<p>Ingredients</p>
				</div>
				<div className={styles.nutrition__menu__item}>
					<div className={styles.nutrition__menu__item__image}>
                    <img src="/food/collard_greens.png" alt="ingr" />
					</div>
					<p>Nutrition</p>
				</div>
				<div className={styles.nutrition__menu__item}>
					<div className={styles.nutrition__menu__item__image}>
                    <img src="/food/spinach.png" alt="ingr" />
					</div>
					<p>Health</p>
				</div>
			</div>
		</div>
	);

	const UiTwo = () => (
		<div className={styles.uiOne}>
			<DropdownTwoComponent list={[]} />
		</div>
	);

	return (
		<WikiTray title={title}>
			<div className={styles.nutrition}>
				<div className={styles.toggle}>
					<div
						className={
							toggle === 'one'
								? styles.toggle__child + ' ' + styles.active
								: styles.toggle__child
						}
						onClick={() => setToggle('one')}
					>
						Pictures
					</div>
					<div
						className={
							toggle === 'two'
								? styles.toggle__child + ' ' + styles.active
								: styles.toggle__child
						}
						onClick={() => setToggle('two')}
					>
						Rankings
					</div>
				</div>
				<div>{toggle === 'one' ? <UiOne /> : <UiTwo />}</div>
			</div>
		</WikiTray>
	);
}
