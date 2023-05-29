/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './toggler.module.scss';

interface togglerInterface {
	childs: Array<string>,
	value: any,
	setValue: Function,
	style: object,
	lineCss: object,
	childColor: string,
	icons: Array<string>,
	tags: Array<string>,
	tagColor: string
}

export default function TogglerComponent({
	childs,
	value,
	setValue,
	style,
	lineCss,
	childColor,
	icons,
    tags,
	tagColor
}: togglerInterface) {
	if (!childs) return null;

	style = style || {};
	const length = childs.length;
	const width = `${100 / length}%`;


	style = { ...style, width: width };

	if (lineCss) style = { ...style, borderRight: lineCss };
	if (childColor) style = { ...style, color: childColor };

	const handleSelect = (VALUE: any) => {
		setValue && setValue(VALUE);
	};

	return (
		<div className={styles.toggler}>
			{childs &&
				childs.map((child, i) => (
					<div
						style={style}
						key={child + i}
						onClick={() => handleSelect(child)}
						className={
							value === child
								? styles.toggler__main + ' ' + styles.active
								: styles.toggler__main
						}
					>
						<div className={styles.children}>
							{icons && icons[i] && (
								<div className={styles.toggler__left}>
									<img src={`${icons[i]}`} alt={icons[i]} />
								</div>
							)}
							<div className={styles.toggler__right}>
                                {
                                    tags && tags[i] && <p>{tags[i]}</p>
                                }
                                <p>{child}</p>
                            </div>
						</div>
					</div>
				))}
		</div>
	);
}
