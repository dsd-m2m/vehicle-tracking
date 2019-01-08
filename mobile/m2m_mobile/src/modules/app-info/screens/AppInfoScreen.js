import React from 'react';
import { View } from 'react-native';
import {
  Screen,
  Card,
  Text,
} from '~/modules/ui';
import { Sensor } from '~/modules/home';
import { styles } from './styles';

export default function AppInfoScreen() {
  return (
    <Screen>
      <Card>
        <Sensor
          name="Course"
          value="Distributed Software Development"
        />
        <Sensor
          name="Project"
          value="M2M Vehicle Tracking"
        />
        <Sensor
          name="Year"
          value="2018"
        />
        <View style={styles.horizontalContainer}>
          <Text sensorName>Team</Text>
          <View>
            <Text>Juraj Pejnović</Text>
            <Text>Mehdi Mehdikhani</Text>
            <Text>Zvonimir Lončarić</Text>
            <Text>Amin Mahboubi</Text>
            <Text>Tomislav Skoković</Text>
            <Text>Frano Mirković</Text>
            <Text>Soheil Ghanbari</Text>
          </View>
        </View>
        <View style={styles.horizontalContainer}>
          <Text sensorName>Supervisors</Text>
          <View>
            <Text>Igor Čavrak</Text>
            <Text>Raffaela Mirandola</Text>
          </View>
        </View>
      </Card>
    </Screen>
  );
}
