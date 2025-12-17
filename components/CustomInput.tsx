import cn from 'clsx';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { CustomInputProps } from '../type';

const CustomInput = ({ 
    placeholder = "Enter Text", 
    value, 
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = 'default'
}: CustomInputProps) => {

    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className='w-full'>
            <Text className='label'>{label}</Text>
            
            <TextInput 
                className={cn("input", isFocused ? "border-primary" : "border-gray-300")}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={placeholder} 
                placeholderTextColor="#888"
                value={value} 
                onChangeText={onChangeText} 
                secureTextEntry={secureTextEntry} 
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    )
}

export default CustomInput