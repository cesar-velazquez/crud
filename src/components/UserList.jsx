import React from 'react'
import UserCard from './UserCard'

const UserList = ({ users,
  deleteUsers,
  handleUpdateUsers,
  handleNotification,
  isShowNotification,
  setisShowNotification,
  imageBase64
}) => {

  return (
    <section className='grid m-auto  my-4 bg-transparent text-white p-4 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 max-w-7xl '>
      {
        users.map((user) => <UserCard
          key={user.id}
          user={user}
          deleteUsers={deleteUsers}
          handleUpdateUsers={handleUpdateUsers}
          handleNotification={handleNotification}
          isShowNotification={isShowNotification}
          setisShowNotification={setisShowNotification}
          imageBase64={imageBase64}
        />)
      }
    </section>
  )
}
export default UserList