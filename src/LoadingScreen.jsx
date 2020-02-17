import classnames from 'classnames/bind';
import React from 'react';
import styles from './LoadingScreen.module.css';
import {ReactComponent as Spiral} from './spiral.svg';

const cx = classnames.bind(styles);

export default function LoadingScreen() {
	return (
		<div className={styles.backdrop}>
			<div className={styles.centerPadding}/>
			<div className={styles.verticalCenter}>
				<div className={styles.centerPadding}/>
				<div className={styles.content}>
					<Spiral className={cx(styles.spiral, 'spiral1')}/>
					<Spiral className={cx(styles.spiral, 'spiral2')}/>
					<Spiral className={cx(styles.spiral, 'spiral3')}/>
					<div className={styles.a}>A</div>
					<div className={styles.tagLine}>Crawling through the portal...</div>
				</div>
				<div className={styles.centerPadding}/>
			</div>
			<div className={styles.centerPadding}/>
		</div>
	);
}
