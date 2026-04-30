import { FC } from 'react';

import type { VideoSpotlightProps } from '../interface/VideoSpotlight.props';
import styles from './VideoSpotlight.module.css';

const VideoSpotlight: FC<VideoSpotlightProps> = ({ sectionId, title, description, youtubeId }) => {
	if (!youtubeId.trim()) {
		return null;
	}

	const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId.trim())}`;

	return (
		<section id={sectionId} className={styles.section} aria-labelledby={`${sectionId}-title`}>
			<h2 id={`${sectionId}-title`} className={styles.title}>
				{title}
			</h2>
			<p className={styles.description}>{description}</p>
			<div className={styles.ratio}>
				<iframe
					className={styles.iframe}
					src={src}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					loading="lazy"
					referrerPolicy="strict-origin-when-cross-origin"
				/>
			</div>
		</section>
	);
};

export default VideoSpotlight;
