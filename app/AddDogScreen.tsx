import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../App'; // Adjust the import path as needed
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
// type AddDogScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddDog'>;
// type AddDogScreenRouteProp = RouteProp<RootStackParamList, 'AddDog'>;

// type Props = {
//   navigation: AddDogScreenNavigationProp;
//   route: AddDogScreenRouteProp;
// };

type Dog = {
  id: string;
  name: string;
  breed: string;
  age: number;
  colour: string;
  allergies: string;
  vaccinations: string;
  microchip: boolean;
  blades: string;
  timeRequired: number;
};

const AddDogScreen = () => {
  // const { clientId, dogId } = route.params;
  const dogId = '1';
  const clientId = '1';
  const [dog, setDog] = useState<Dog | null>(null);
  // const [isEditMode, setIsEditMode] = useState(dogId ? false : true);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (dogId) {
      // Fetch the dog data based on dogId
      // For now, using dummy data
      const dummyDogs: Dog[] = [
        {
          id: '1',
          name: 'Buddy',
          breed: 'Bulldog',
          age: 3,
          colour: 'Brown',
          allergies: 'None',
          vaccinations: 'Up to date',
          microchip: true,
          blades: '5F',
          timeRequired: 60,
        },
        {
          id: '2',
          name: 'Max',
          breed: 'Labrador',
          age: 5,
          colour: 'Black',
          allergies: 'Peanuts',
          vaccinations: 'Up to date',
          microchip: true,
          blades: '7F',
          timeRequired: 90,
        },
      ];

      const foundDog = dummyDogs.find(d => d.id === dogId);
      if (foundDog) {
        setDog(foundDog);
      } else {
        setDog(null);
      }
    } else {
      setDog({
        id: '',
        name: '',
        breed: '',
        age: 0,
        colour: '',
        allergies: '',
        vaccinations: '',
        microchip: false,
        blades: '',
        timeRequired: 0,
      });
    }
  }, [dogId]);

  if (!dog) {
    return (
      <View style={styles.container}>
        <Text>Dog not found</Text>
      </View>
    );
  }

  const handleSaveDog = () => {
    // Implement save functionality here
    console.log('Dog saved', dog);
    navigation.navigate('ClientDetails', { clientId, dog });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {!isEditMode ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(true)}>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(false)}>
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={dog.name}
        onChangeText={(text) => setDog({ ...dog, name: text })}
        editable={isEditMode}
      />
      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={dog.breed}
        onChangeText={(text) => setDog({ ...dog, breed: text })}
        editable={isEditMode}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={dog.age.toString()}
        onChangeText={(text) => setDog({ ...dog, age: parseInt(text) })}
        keyboardType="numeric"
        editable={isEditMode}
      />
      <Text style={styles.label}>Colour</Text>
      <TextInput
        style={styles.input}
        placeholder="Colour"
        value={dog.colour}
        onChangeText={(text) => setDog({ ...dog, colour: text })}
        editable={isEditMode}
      />
      <Text style={styles.label}>Allergies</Text>
      <TextInput
        style={styles.input}
        placeholder="Allergies"
        value={dog.allergies}
        onChangeText={(text) => setDog({ ...dog, allergies: text })}
        editable={isEditMode}
      />
      <Text style={styles.label}>Vaccinations</Text>
      <TextInput
        style={styles.input}
        placeholder="Vaccinations"
        value={dog.vaccinations}
        onChangeText={(text) => setDog({ ...dog, vaccinations: text })}
        editable={isEditMode}
      />
      <Text style={styles.label}>Blades</Text>
      <TextInput
        style={styles.input}
        placeholder="Blades"
        value={dog.blades}
        onChangeText={(text) => setDog({ ...dog, blades: text })}
        editable={isEditMode}
      />
      <Text style={styles.label}>Time Required</Text>
      <TextInput
        style={styles.input}
        placeholder="Time Required"
        value={dog.timeRequired.toString()}
        onChangeText={(text) => setDog({ ...dog, timeRequired: parseInt(text) })}
        keyboardType="numeric"
        editable={isEditMode}
      />
      {isEditMode && (
        <Button title="Save Dog" onPress={handleSaveDog} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editButton: {
    marginBottom: 16,
  },
});

export default AddDogScreen;