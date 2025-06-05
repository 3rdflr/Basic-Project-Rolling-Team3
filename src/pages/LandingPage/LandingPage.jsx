import mainImg_01 from '../../assets/images/mainImg_01.svg';
import mainImg_02 from '../../assets/images/mainImg_02.svg';

import Header from '../../components/headers/Header/Header';
import Container from '../../components/Container/Container';
import TextContainer from '../../components/Container/TextContainer';
import Button from '../../components/buttons/Button/Button';

const content_1 = {
	point: 'Point. 01',
	title1: '누구나 손쉽게, 온라인 ',
	title2: '롤링 페이퍼를 만들 수 있어요',
	span: '로그인 없이 자유롭게 만들어요.',
	img: mainImg_01,
};

const content_2 = {
	point: 'Point. 02',
	title1: '서로에게 이모지로 감정을 ',
	title2: '표현해보세요',
	span: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
	img: mainImg_02,
};

function LandingPage() {
	return (
		<>
			<Header />
			<Container>
				<TextContainer content={content_1} />
				<TextContainer content={content_2} isReverse={true} />
				<Button classStyle={'primary'} linkTo={'/additem'} children={'구경해보기'} />
			</Container>
		</>
	);
}

export default LandingPage;
