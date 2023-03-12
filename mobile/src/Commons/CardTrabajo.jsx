import { Card } from '@rneui/base'
import React from 'react'
import { View, Text } from 'react-native'


function CardTrabajo({evento}) {
  return (
    <View style={{marginTop:25}}>
    <Card styles={{marginTop:25}}>
      <Card.Title>{evento[0].branch.fulladdress}</Card.Title>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://www.coto.com.ar/institucional/inauguracion-neuquen/images/neq.jpg',
            }}
          />
            <Text>
            {`${evento[0].date} \n${evento[0].branch.name} \nTURNO: ${evento[0].shift.type}`}
              </Text>
    </Card>
    </View>
  )
}

export default CardTrabajo




