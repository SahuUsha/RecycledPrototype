import React from 'react'
import AddEvent from '../components/AddEvent'
import EventList from '../components/EventList'

const Event = () => {
  return (
    <div>
    {/* <AddEvent onEventAdded={() => window.location.reload()} /> */}
    <EventList />
    </div>
  )
}

export default Event
