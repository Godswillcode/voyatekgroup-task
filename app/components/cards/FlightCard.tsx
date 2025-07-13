import React from 'react'
import { CardWrapper } from './CardWrapper'
import { OnEmpty } from '../Empty'
import flightsEmpty from '../../images/FlightE.png'

export const FlightCard = () => {
  return (
    <CardWrapper
      bgColor="var(--background)"
      title="Flights"
      icon="mdi:flight"
      titleColor='#000'
      link="/flights"
    >
      <OnEmpty
        title="Flights"
        image={flightsEmpty.src}
        linkPath="/flights"
      />
    </CardWrapper>
  )
}
