import React from 'react'
import Title from './Title'
import Controls from './Controls'

class TopBar extends React.Component {
  render() {
    return (
      <div>
        <Title/>
        <Controls/>
      </div>
    )
  }
}

export default TopBar
