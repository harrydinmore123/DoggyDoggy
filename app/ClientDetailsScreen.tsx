import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../App'; // Adjust the import path as needed
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// type ClientDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClientDetails'>;
// type ClientDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ClientDetails'>;

// type Props = {
//   navigation: ClientDetailsScreenNavigationProp;
//   route: ClientDetailsScreenRouteProp;
// };

type Client = {
  id: string;
  name: string;
  mobile: number;
  address: string;
  postcode: string;
  emergencyName: string;
  emergencyMobile: number;
  vetsName: string;
  vetsMobile: number;
  dogs: Dog[];
}

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
}

const ClientDetailsScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
  // const { clientId, createMode, dog } = route.params;
  // const [client, setClient] = useState<Client | null>(null);
  // const [isEditMode, setIsEditMode] = useState(createMode || false);
  const [isEditMode, setIsEditMode] = useState(false);

    const [client, setClient] = useState<Client>({
      id: '',
      name: '',
      mobile: 0,
      address: '',
      postcode: '',
      emergencyName: '',
      emergencyMobile: 0,
      vetsName: '',
      vetsMobile: 0,
      dogs: [],
    });
  // useEffect(() => {
  //   if (!createMode && clientId) {
  //     // Fetch the client data based on clientId
  //     // For now, using dummy data
  //     const dummyClients: Client[] = [
  //       {
  //         id: '1',
  //         name: 'John Doe',
  //         mobile: 1234567890,
  //         address: '123 Main St',
  //         postcode: '12345',
  //         emergencyName: 'Jane Doe',
  //         emergencyMobile: 9876543210,
  //         vetsName: 'Dr. Smith',
  //         vetsMobile: 1122334455,
  //         dogs: [
  //           {
  //             id: '1',
  //             name: 'Buddy',
  //             breed: 'Bulldog',
  //             age: 3,
  //             colour: 'Brown',
  //             allergies: 'None',
  //             vaccinations: 'Up to date',
  //             microchip: true,
  //             blades: '5F',
  //             timeRequired: 60,
  //           },
  //           {
  //             id: '2',
  //             name: 'Max',
  //             breed: 'Labrador',
  //             age: 5,
  //             colour: 'Black',
  //             allergies: 'Peanuts',
  //             vaccinations: 'Up to date',
  //             microchip: true,
  //             blades: '7F',
  //             timeRequired: 90,
  //           },
  //         ],
  //       },
  //       {
  //         id: '2',
  //         name: 'Alice Smith',
  //         mobile: 2345678901,
  //         address: '456 Elm St',
  //         postcode: '67890',
  //         emergencyName: 'Bob Smith',
  //         emergencyMobile: 8765432109,
  //         vetsName: 'Dr. Johnson',
  //         vetsMobile: 2233445566,
  //         dogs: [
  //           {
  //             id: '3',
  //             name: 'Bella',
  //             breed: 'Poodle',
  //             age: 2,
  //             colour: 'White',
  //             allergies: 'None',
  //             vaccinations: 'Up to date',
  //             microchip: true,
  //             blades: '4F',
  //             timeRequired: 45,
  //           },
  //         ],
  //       },
  //     ];

  //     const foundClient = dummyClients.find(c => c.id === clientId);
  //     if (foundClient) {
  //       setClient(foundClient);
  //     } else {
  //       setClient(null);
  //     }
  //   } else if (createMode) {
  //     setClient({
  //       id: '',
  //       name: '',
  //       mobile: 0,
  //       address: '',
  //       postcode: '',
  //       emergencyName: '',
  //       emergencyMobile: 0,
  //       vetsName: '',
  //       vetsMobile: 0,
  //       dogs: [],
  //     });
  //   }
  // }, [clientId, createMode]);

  // useEffect(() => {
  //   if (dog && client) {
  //     setClient({ ...client, dogs: [...client.dogs, dog] });
  //   }
  // }, [dog]);

  // if (!client) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Client not found</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      {!isEditMode && (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(true)}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={client.name}
        onChangeText={(text) => setClient({ ...client, name: text })}
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={client.mobile.toString()}
        onChangeText={(text) => setClient({ ...client, mobile: parseInt(text) })}
        keyboardType="numeric"
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={client.address}
        onChangeText={(text) => setClient({ ...client, address: text })}
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Postcode"
        value={client.postcode}
        onChangeText={(text) => setClient({ ...client, postcode: text })}
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Name"
        value={client.emergencyName}
        onChangeText={(text) => setClient({ ...client, emergencyName: text })}
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Mobile"
        value={client.emergencyMobile.toString()}
        onChangeText={(text) => setClient({ ...client, emergencyMobile: parseInt(text) })}
        keyboardType="numeric"
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Vet's Name"
        value={client.vetsName}
        onChangeText={(text) => setClient({ ...client, vetsName: text })}
        editable={isEditMode}
      />
      <TextInput
        style={styles.input}
        placeholder="Vet's Mobile"
        value={client.vetsMobile.toString()}
        onChangeText={(text) => setClient({ ...client, vetsMobile: parseInt(text) })}
        keyboardType="numeric"
        editable={isEditMode}
      />
      <View style={styles.dogsContainer}>
        <Text style={styles.dogsTitle}>Dogs</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDogScreen', { clientId: client.id })}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {client.dogs.map((dog) => (
        <TouchableOpacity key={dog.id} onPress={() => navigation.navigate('AddDogScreen', { clientId: client.id, dogId: dog.id })}>
          <Text style={styles.dogName}>{dog.name}</Text>
        </TouchableOpacity>
      ))}
      {isEditMode && (
        <Button title="Save Client" onPress={() => {
          // Implement save functionality here
          console.log('Client saved', client);
          setIsEditMode(false);
        }} />
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  dogsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dogsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  addButton: {
    marginLeft: 8,
  },
  dogName: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
});

export default ClientDetailsScreen;