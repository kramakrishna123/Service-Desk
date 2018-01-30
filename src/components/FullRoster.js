import React from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';



// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
      <DatePicker/>
  </div>
)

export default FullRoster
