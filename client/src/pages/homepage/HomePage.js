import React from 'react';
import Directory from '../../components/directory/Directory';

import { HomePageContainer } from './homepage.styles';
import { Profiler } from 'react';

const HomePage = () => (
  <HomePageContainer>
    <Profiler 
      id="Directory"
      onRender={(id, phase, actualDuration) => {
        console.log({
          id,
          phase,
          actualDuration
        })
      } 
    }>
     <Directory />
    </Profiler>
  </HomePageContainer>
);

export default HomePage;