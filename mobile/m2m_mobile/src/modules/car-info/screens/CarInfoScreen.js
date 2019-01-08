import React from 'react';
import {
  Screen,
  Card,
} from '~/modules/ui';
import { Sensor } from '~/modules/home';

export default function AppInfoScreen() {
  return (
    <Screen>
      <Card>
        <Sensor
          name="Model name"
          value="Concept One"
        />
        <Sensor
          name="Manufacturer"
          value="Rimac Automobili"
        />
        <Sensor
          name="Year"
          value="2015"
        />
        <Sensor
          name="VIN"
          value="1T7HT4B27X1183680"
        />
      </Card>
    </Screen>
  );
}
