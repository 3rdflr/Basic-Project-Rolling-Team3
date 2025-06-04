import style from './ProfileImg.module.css';

function ProfileImg({ count, data }) {
	const displayCount = Math.min(data?.length || 0, 3);
	const rest = count - displayCount;

	return (
		<div className={style.wrapper}>
			{data &&
				data
					.slice(0, displayCount)
					.map((profile, index) => (
						<img
							key={index}
							className={style.profileImage}
							src={profile.profileImageURL}
							alt={`프로필 이미지 ${index + 1}`}
						/>
					))}
			{rest > 0 && <span className={style.remainingCount}>+{rest}</span>}
		</div>
	);
}

export default ProfileImg;
