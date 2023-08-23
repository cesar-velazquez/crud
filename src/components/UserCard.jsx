

const UserCard = ({ user, deleteUsers, handleUpdateUsers, handleNotification}) => {
        

  return (
    <section className='bg-[#FFF] text-center border-2 border-[#E5E5E5]  my-4 p-4 sm:my-1'>
      <ul className='text-center'>
        <li className="text-black font-bold text-xl font-sans">{user.first_name} {user.last_name}</li>        
        <li className="text-[#302F2F] font-serif font-medium"><span className="text-[#D3D3D3] text-left">Email:</span> <br /> <i className='bx bx-envelope align-middle ' ></i> {user.email}</li>
        {/* <li  >Contraseña: {user.password}</li> */}
        <li className="text-[#302F2F] font-serif font-medium" ><span className="text-[#D3D3D3] text-left">Cumpleaños:</span> <br /> <i className='bx bx-gift align-middle' ></i> {user.birthday}</li>
        {/* <li>Foto: {user.image_url}</li> */}
      </ul>
      <div>
        <button onClick={() => deleteUsers(user.id)} className='bg-red-500 p-2 text-black rounded-lg'> <i className='bx bx-trash bx-tada-hover'></i> </button>
        <button onClick={() => handleUpdateUsers(user)} className='bg-white text-black p-2 rounded-lg ml-2'><i className='bx bx-edit-alt bx-tada-hover'></i></button>
        {/* <button onClick={() => handleNotification()} className='bg-black text-white m-4 p-3' >Notificación</button> */}
      </div>
    </section>
  )
}

export default UserCard