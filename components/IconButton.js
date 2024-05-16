import { Text, View, StyleSheet, Pressable, Image, Platform } from "react-native"
import {Ionicons} from '@expo/vector-icons'

const IconButton = ({icon, color, onPressIcon}) => {
    return (
        <Pressable onPress={onPressIcon} style={({pressed}) => pressed && styles.pressed} >
            <Ionicons name={icon} size={24} color={color}/>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    itemText: {
        color: '#351401',
        textAlign: 'center'
    }
})