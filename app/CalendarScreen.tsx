import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
      />
      {selectedDate ? <Text style={styles.text}>Selected Date: {selectedDate}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});
