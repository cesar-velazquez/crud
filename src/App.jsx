import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ModalForm from './components/ModalForm'
import { EMPTY_FORM_VALUES } from './shared/constants'
import UserList from './components/UserList'
import Notification from './components/Notification'

const BASE_URL = "https://users-crud.academlo.tech/users/"
function App() {
  const [selectedImageName, setSelectedImageName] = useState('')
  //estado para determinar que el modal se muestre o se oculte
  const [isShowModal, setIsShowModal] = useState(false);
  //estado para ver los usuarios
  const [users, setUsers] = useState([])
  //estado para saber si se está actualizando el usuario
  const [isUserUpdate, setIsUserUpdate] = useState(null)

  //estado para que se muestre un modal de notificación
  const [isShowNotification, setIsShowNotification] = useState(false)

  //estado para cambiar a darkmode
  const [isdarkmode, setIsdarkmode] = useState(localStorage.getItem('theme') === 'dark')


  //función para que se muestre mi modal
  const handleClickOpenModal = () => {
    setIsShowModal(true);
  };

  //estado para trabajar mi imagen
  const [imageBase64, setImageBase64] = useState('');


  //funcion para manejar mi imagen
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setImageBase64(imageData);
        localStorage.setItem('imageData', imageData);
      };
      reader.readAsDataURL(file);      
    }
  };

  //función para cambiar a darkmode
  const handleChangeMode = () => {
    setIsdarkmode(!isdarkmode)
  }

  //función axios para obtener todos los usuarios
  const getAllUsers = () => {
    axios
      .get(BASE_URL)
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err))
  }

  //función para crear un usuario 
  const createUser = (newUser, reset) => {
    axios
      .post(BASE_URL, newUser)
      .then(() => {
        getAllUsers()
        setIsShowModal(false)
        reset(EMPTY_FORM_VALUES);
      })
      .catch((err) => console.log(err))
  }

  // funcion para borrar users
  const deleteUsers = (idUser) => {
    axios
      .delete(BASE_URL + idUser + '/')
      .then(() => {
        getAllUsers();
      })
      .catch((err) => console.log(err))
  }

  //función para actualizar
  const handleUpdateUsers = (user) => {
    setIsShowModal(true)
    setIsUserUpdate(user)  
  const imageBase64 = user.image_url || '';
  setImageBase64(imageBase64);  
  }


  //función para actualizar con axios
  const UpdateUser = (UpdatedUser, reset) => {
    axios
      .patch(BASE_URL + isUserUpdate.id + '/', UpdatedUser)
      .then(() => {
        getAllUsers()
        setIsShowModal(false)
        reset(EMPTY_FORM_VALUES)
        setIsUserUpdate(null)
      })
      .catch((err) => console.log(err))
  }

  //función para mostrar una notificación
  const handleNotification = () => {
    setIsShowModal(true)
  }

  //hook para renderizar la primera vez que se carga la página.
  useEffect(() => {
    const storedImageData = localStorage.getItem('imageData');
    if (storedImageData) {
      setImageBase64(storedImageData);
    }


    getAllUsers();
    isdarkmode
      ? (document.documentElement.classList.add('dark'), localStorage.setItem('theme', 'dark'))
      : (document.documentElement.classList.remove('dark'), localStorage.setItem('theme', 'light'))
  }, [isdarkmode])

  return (
    <main className='bg-purple-200 min-h-screen dark:bg-blue-950 dark:transition-colors duration-1000 dark:duration-1000'>
      <div className='flex items-center justify-around bg-purple-500 dark:bg-black dark:text-white dark:transition-colors duration-1000 dark:duration-1000'>
        <h1 className="text-3xl font-bold text-center m-3 max-w-5xl">Usuarios</h1>
        {
          isdarkmode ?
            <i onClick={handleChangeMode} className='bx bxs-sun text-yellow-400 bg-black border-[1px] rounded-full p-1 cursor-pointer dark:transition-colors duration-1000 dark:duration-1000'></i>
            : <i onClick={handleChangeMode} className='bx bxs-moon text-white bg-black rounded-full p-1 cursor-pointer dark:transition-colors duration-1000 dark:duration-1000'></i>
        }
      </div>

      <div className=' flex m-auto justify-center sm:flex sm:justify-end sm:pr-9 sm:max-w-full'>
        <button onClick={handleClickOpenModal} className='bg-purple-700 shadow-lg shadow-indigo-500/100 dark:shadow-black/80  mt-5 dark:bg-black text-white p-2 rounded-md cursor-pointer dark:transition-colors duration-1000 dark:duration-1000'> <i className='bx bx-plus bx-spin-hover' ></i> Crear Nuevo Usuario </button>
      </div>

      <ModalForm      
        isShowModal={isShowModal}
        handleClickOpenModal={handleClickOpenModal}
        createUser={createUser}
        isUserUpdate={isUserUpdate}
        UpdateUser={UpdateUser}
        setIsShowModal={setIsShowModal}
        setIsUserUpdate={setIsUserUpdate}
        imageBase64={imageBase64}
        handleImageChange={handleImageChange}
      />

      <UserList
        users={users}
        deleteUsers={deleteUsers}
        handleUpdateUsers={handleUpdateUsers}
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
        handleNotification={handleNotification}
        imageBase64={imageBase64}
      />
    </main>
  )
}

export default App
