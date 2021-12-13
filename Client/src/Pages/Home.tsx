import DisplayProducts from '../Components/DisplayProducts';
import { StyledHome } from './StyledPages/StyledHome';

const Home = () => {
  return (
    <StyledHome>
      <DisplayProducts url='/api/products' />
    </StyledHome>
  );
};

export default Home;
