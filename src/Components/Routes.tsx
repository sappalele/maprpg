import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MapScreen, StartScreen } from './Screens';
import { BabylonTestScreen } from './Screens/BabylonTestScreen';
import { BattleTestScreen } from './Screens/BattleTestScreen';
import { GlslTestScreen } from './Screens/GlslTestScreen';

export const URLS = {
  START: '/',
  MAP: '/m',
  BABYLON_TEST: '/babylon-test',
  MAP_TEST: '/map-test',
  GLSL_TEST: '/glsl-test',
  BATTLE_TEST: '/battle-test',
};

export const Routes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Switch
        location={location || null}
        key={location ? location.pathname : ''}
      >
        <Route exact path={URLS.MAP} component={MapScreen} />
        <Route exact path={URLS.BABYLON_TEST} component={BabylonTestScreen} />
        <Route exact path={URLS.GLSL_TEST} component={GlslTestScreen} />
        <Route exact path={URLS.BATTLE_TEST} component={BattleTestScreen} />
        <Route exact path={URLS.START} component={StartScreen} />
      </Switch>
    </>
  );
};
