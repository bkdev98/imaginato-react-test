import React, {createRef} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';

import data from './data.json';
import useLiveScores from './hooks/useLiveScores';
import theme, {ThemeType} from './theme';

import StreamerList from './components/StreamerList';
import StreamerItem from './components/StreamerItem';

const GlobalStyle = createGlobalStyle<{theme: ThemeType}>`
  body {
    margin: 0;
    font-family: 'Encode Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.backdrop};
    color: ${props => props.theme.text};
    @media (max-width: 768px) {
      font-size: 0.9em;
    }
  }
`

const Wrapper = styled.div`
  padding: 0 10px;
`;

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 15px 0;
  background-color: ${props => props.theme.background};
  border-radius: 24px;
  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 20px;
`;

function App() {
  const liveScores = useLiveScores(data);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Wrapper>
          <Container>
            <Title>Leaderboard</Title>
            <StreamerList>
              {liveScores.map((item, index) => (
                <StreamerItem key={item.userId} ref={createRef()} index={index} data={item} />
              ))}
            </StreamerList>
          </Container>
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

export default App;
