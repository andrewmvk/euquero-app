import React from "react";
import { Container } from './styles';
import { Text } from 'react-native'
import { Button } from 'react-native-elements';

export default () => {
    return (
        <Container>
            <Text>Home</Text>
            <Button title="Hey!" />
        </Container>
    )
}