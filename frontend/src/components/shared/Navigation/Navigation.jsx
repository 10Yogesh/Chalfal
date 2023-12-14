import React from 'react'
import { Link } from 'react-router-dom'
import {logout} from '../../../http'
import styles from './Navigation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice';

const Navigation = () => {
  const brandStyle ={ 
    color: '#ffffff',
    textDecoration:'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center'

  }

  const logoText = {
    marginLeft: '15px'
  }
  
  const dispatch = useDispatch()
  const {isAuth, user} = useSelector((state) => state.auth)
  async function logoutUser(){
    console.log('hdehh')
      try {
        const {data} = await logout()
        dispatch(setAuth(data))
      } catch (err) {
        console.log(err)
      }

  }

  return (
    <nav className={`${styles.navbar} container`}>
      
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>Chalfal</span>
      </Link>
      {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    {user.avatar && (
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : '/images/monkey-avatar.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    )}
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <img src="/images/logout.png" alt="logout" />
                    </button>
                </div>
            )}
    </nav>
  )
}

export default Navigation




  