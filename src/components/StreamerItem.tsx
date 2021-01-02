import React, {forwardRef} from 'react';
import styled from 'styled-components';

import IStreamer from '../entities/IStreamer';
import {getOrdinalNum} from '../utils/mixed';

import Avatar from './Avatar';
import AnimatedScore from './AnimatedScore';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: ${props => props.theme.background};
`;

interface RankCountProps {
  readonly index: number;
};

const RankCount = styled.span<RankCountProps>`
  min-width: 45px;
  font-weight: 600;
  font-size: 1.3em;
  color: ${props => props.theme.rankColors[props.index]};
  ::after {
    content: "${props => getOrdinalNum(props.index + 1)}";
    font-size: 0.5em;
    vertical-align: top;
    margin-left: 2px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
  border: 1px solid ${props => props.theme.border};
  border-radius: .5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
`;

interface AvatarWrapperProps {
  readonly index: number;
};

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  padding: 5px 40px;
  background-color: ${props => props.theme.rankColors[props.index] || props.theme.rankDefault};
  border-top-left-radius: .5rem;
  border-bottom-left-radius: .5rem;
`;

const Label = styled.span`
  font-size: 0.8em;
  color: ${props => props.theme.caption};
  display: block;
`;

const DisplayNameWrapper = styled.div`
  margin-left: 15px;
`;

const DisplayName = styled.span`
  font-weight: 600;
`;

const ScoreWrapper = styled.span`
  margin-right: 15px;
  width: 70px;
`;

interface StreamerItemProps {
  data: IStreamer;
  index: number;
}

const StreamerItem: React.FC<StreamerItemProps & { ref: React.Ref<HTMLDivElement> }> = forwardRef(({ data, index }, ref) => {
  return (
    <Wrapper ref={ref}>
      <RankCount index={index}>{index + 1}</RankCount>
      <Container>
        <MetaInfo>
          <AvatarWrapper index={index}>
            <Avatar displayName={data.displayName} />
          </AvatarWrapper>
          <DisplayNameWrapper>
            <Label>Streamer</Label>
            <DisplayName>{data.displayName}</DisplayName>
          </DisplayNameWrapper>
        </MetaInfo>
        <ScoreWrapper>
          <Label>Points</Label>
          <AnimatedScore value={data.score} />
        </ScoreWrapper>
      </Container>
    </Wrapper>
  )
})

export default StreamerItem;
