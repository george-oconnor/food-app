import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const submit = async () => {
    const { name, email, password } = form;


    if(!name || !email || !password) return Alert.alert('Error', 'Please enter a valid name, email address, and password');

    setIsSubmitting(true);

    try {
      await createUser({ name, email, password });

      router.replace("/")
    } catch(error: any) {
      Alert.alert('Error', error.message || 'An error occurred during sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <View className='gap-10 bg-white rounded-lg '>

      <CustomInput 
          placeholder='Enter Your Full Name'
          value = {form.name}
          onChangeText={(text) => {setForm((prev) => ({ ...prev, name: text }))}}
          label="Full Name"
          keyboardType='default'
        />

      <CustomInput 
          placeholder='Enter Your Email'
          value = {form.email}
          onChangeText={(text) => {setForm((prev) => ({ ...prev, email: text }))}}
          label="Email"
          keyboardType='email-address'
        />

        <CustomInput 
          placeholder='Enter Your Password'
          value = {form.password}
          onChangeText={(text) => {setForm((prev) => ({ ...prev, password: text }))}}
          label="Password"
          keyboardType='default'
          secureTextEntry={true}
        />
        
        <CustomButton
          title='Sign Up'
          isLoading={isSubmitting}
          onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>
            Already have an account?
          </Text>
          <Link href="/sign-in" className='base-bold text-primary'>
            Sign In
          </Link>
        </View>
    </View>
  )
}

export default SignUp