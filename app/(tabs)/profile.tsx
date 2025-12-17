import { router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import useAuthStore from '../../store/auth.store'

const profile = () => {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/sign-in');
  };

  return (
    <View className="flex-1 bg-white px-6 py-10">
      <Text className="text-2xl font-bold mb-4">Account</Text>
      {user && (
        <View className="mb-8">
          <Text className="text-lg font-semibold">{user.name}</Text>
          <Text className="text-gray-500">{user.email}</Text>
        </View>
      )}

      <CustomButton
        title="Log Out"
        onPress={handleLogout}
        isLoading={isLoading}
      />
    </View>
  )
}

export default profile