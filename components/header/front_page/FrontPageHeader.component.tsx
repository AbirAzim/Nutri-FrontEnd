import React from 'react';
import styles from './FrontPageHeader.module.scss';
import Image from 'next/image';
import ButtonComponent from '../../../theme/button/buttonA/button.component';
import Link from 'next/link';

const FrontPageHeader = () => {
	return (
		<div className={styles.headerMain}>
			<div className={styles.headerContent}>
				<div className={styles.logo}>
					<Image
						src="/images/logo.png"
						alt="logo"
						height={'52px'}
						width={'180px'}
						objectFit={'contain'}
						layout={'responsive'}
					/>
				</div>
				<div className={styles.rightOptionTray}>
					<ul>
						<li>
							<div className={styles.features}>
								<Link href="#">
									<a>Features</a>
								</Link>
								<div className={styles.dropDown}>
									<Image
										src="/icons/dropdown.png"
										alt="logo"
										objectFit={'contain'}
										layout={'fill'}
									/>
								</div>
							</div>
						</li>
						<li>
							<div className={styles.login}>
								<Link href="/login">
									<a>
										<ButtonComponent
											type={'primary'}
											style={{ height: '100%' }}
											fullWidth
											value={'Login'}
										/>
									</a>
								</Link>
							</div>
						</li>
						<li>
							<div className={styles.signUp}>
								<Link href="/signup">
									<a>
										<ButtonComponent
											type={'transparent'}
											style={{ border: 'none' }}
											fullWidth
											value={'Sign up'}
										/>
									</a>
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default FrontPageHeader;
