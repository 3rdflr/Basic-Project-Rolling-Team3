import mainImg_01 from '../../assets/images/mainImg_01.svg';
import mainImg_02 from '../../assets/images/mainImg_02.svg';

import KeyFrames from '../../components/animation/logoAnimation.jsx';
import Header from '../../components/headers/Header/Header';
import Container from '../../components/Container/Container';
import TextContainer from '../../components/Container/TextContainer';

import LinkButton from '../../components/buttons/Button/LinkButton';
import { useEffect, useState } from 'react';

const content_1 = {
	header: 'Point. 01',
	title1: '누구나 손쉽게, 온라인 ',
	title2: '롤링 페이퍼를 만들 수 있어요',
	description: '로그인 없이 자유롭게 만들어요.',
	img: mainImg_01,
};

const content_2 = {
	header: 'Point. 02',
	title1: '서로에게 이모지로 감정을 ',
	title2: '표현해보세요',
	description: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
	img: mainImg_02,
};

function LandingPage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fakeTimer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(fakeTimer);
	}, []);

	if (isLoading) {
		return (
			<div>
				<Container>
					<KeyFrames />
				</Container>
			</div>
		);
	} else {
		return (
			<>
				<Header />
				<Container>
					<TextContainer content={content_1} />
					<TextContainer content={content_2} isReverse={true} />
					<LinkButton classStyle={'primary'} linkTo={'/list'} children={'구경해보기'} />
				</Container>
			</>
		);
	}
}

export default LandingPage;
