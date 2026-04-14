import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header, Input, Spacer, Button, Column } from '@components/index';
import { COLORS, SPACING } from '../../../theme';
import { useMode } from '../../../store/ModeContext';

export default function EditProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("Sajilo User");
  const [email, setEmail] = useState("sajilo@example.com");
  const [phone, setPhone] = useState("9800000000");
  const { avatarUri, setAvatarUri } = useMode();

  const handleImagePick = () => {
    Alert.alert(
      "Change Profile Picture",
      "Choose an option to update your avatar",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
              return;
            }
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.5,
            });
            if (!result.canceled && result.assets && result.assets[0]) {
              setAvatarUri(result.assets[0].uri);
            }
          }
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
              return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.5,
            });
            if (!result.canceled && result.assets && result.assets[0]) {
              setAvatarUri(result.assets[0].uri);
            }
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header 
        title="Edit Profile" 
        leftIcon={<Ionicons name="arrow-back" size={24} color="#000" />}
        leftAction={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Column align="center" style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image 
              source={{ uri: avatarUri || "https://i.pravatar.cc/150?img=11" }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBadge} onPress={handleImagePick}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Column>

        <Spacer size="xl" />

        <Input 
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.input}
        />
        <Spacer size="md" />

        <Input 
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          style={styles.input}
        />
        <Spacer size="md" />

        <Input 
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Spacer size="xxl" />

        <Button 
          title="Save Changes" 
          onPress={() => navigation.goBack()}
          variant="primary"
          style={styles.saveBtn}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  content: {
    padding: SPACING.lg,
  },
  avatarSection: {
    marginTop: SPACING.md,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  saveBtn: {
    paddingVertical: 14,
  }
});
