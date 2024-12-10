import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/ProviderInfo">Service Provider</Link><br/>
      <Link to="/TakerInfo">Service Taker</Link>

      <br/>
      <br/>
      <br/>

    <h4>Solving a minor problem using video Call</h4>
    <Link to="/VideoTaker">Service Taker</Link>
    <Link to="/VideoTakerInfo">Service Provider</Link>
    </div>
  )
}

export default Home