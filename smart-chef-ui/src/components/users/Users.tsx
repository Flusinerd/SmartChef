import React from 'react'
import SCUser from '../user/User'

const users = [
    {id: 1, firstname: "Bingo", lastname: "Bongo", email: "bingo.bongo@gmail.com"},
    {id: 2, firstname: "Bingo", lastname: "Bongo", email: "bingo.bongo@gmail.com"},
    {id: 3, firstname: "Bingo", lastname: "Bongo", email: "bingo.bongo@gmail.com"},
]

const SCUsers = () => {
  return (
    <ul>
        {users.map((user) => <SCUser key={user.id} id={user.id} firstname={user.firstname} lastname={user.lastname} email={user.email} />)}
    </ul>
  )
}

export default SCUsers