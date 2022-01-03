import { CardBoard, Card } from "../Components/StyledComponents/CardBoard";
import { StyledContainer } from "../Components/StyledComponents/Container";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Card)`
  color: var(--secondary-light-color);
  font-size: 1.5rem;
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  background-color: rgba(128, 143, 236, 0.41);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 8px 16px #ffb1ad;
  }
  img {
    height: 15rem;
  }
`;

const AdminDashborad = () => {
  return (
    <StyledContainer theme={{ marginTop: "5" }}>
      <CardBoard>
        <StyledCard>
          <Link to='/AdminUsers'>
            <img src='./images/User.webp' alt='Users' />
          </Link>
          <h1 className='card-text'>Users</h1>
        </StyledCard>
        <StyledCard>
          <Link to='/AdminProducts'>
            <img src='./images/Product.webp' alt='Product' />
          </Link>
          <h1 className='card-text'>Product</h1>
        </StyledCard>
        <StyledCard>
          <Link to='/AdminOrders'>
            <img src='./images/Order.webp' alt='Oders' />
          </Link>
          <h1 className='card-text'>Oders</h1>
        </StyledCard>
      </CardBoard>
    </StyledContainer>
  );
};

export default AdminDashborad;
