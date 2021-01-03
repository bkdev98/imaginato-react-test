import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  displayName: string;
}

const Wrapper = styled.div`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  padding: 2px;
  border: 2px ${props => props.theme.background} solid;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
  }
`;

const MultiAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: contain;
  background-color: ${props => props.theme.background};
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Avatar: React.FC<AvatarProps> = ({displayName, ...props}) => {
  return (
    <Wrapper {...props}>
      <MultiAvatar
        alt={`${displayName}'s avatar`}
        src={`https://api.multiavatar.com/${displayName}.png`}
      />
    </Wrapper>
  )
}

export default Avatar;
