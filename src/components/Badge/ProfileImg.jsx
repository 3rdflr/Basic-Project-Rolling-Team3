import style from './ProfileImg.module.css';

const MAX_DISPLAY_COUNT = 3;

function ProfileImg({ count, data }) {
	const displayCount = Math.min(data?.length || 0, MAX_DISPLAY_COUNT);
	const rest = count - displayCount;

	return (
		<div className={style.wrapper}>
			{data &&
				data
					.slice(0, displayCount)
					.map(profile => (
						<img
							key={profile.id}
							className={style.profileImage}
							src={profile.profileImageURL}
							alt={`프로필 이미지 ${profile.id}`}
							loading="lazy"
						/>
					))}
			{rest > 0 && <span className={style.remainingCount}>+{rest}</span>}
		</div>
	);
}

export default ProfileImg;
