import Link from 'next/link'
import {useContext} from 'react'
import {useRouter} from 'next/router'

import AuthContext from '../context/AuthContext'

import styles from '../styles/Header.module.css'
export default () =>{
  const router = useRouter()
  const isHome = router.pathname === "/"
  const goBack = (event) =>{
    event.preventDefault()
    router.back()
  }
  const { user } = useContext(AuthContext)
  return (
    <div>
    {!isHome && <a  href="#" onClick={event=>goBack(event)}> {"<"} Back</a>}
      <div className={styles.title}>
      <Link href="/" >
      <a>
      <h1>E-commerce Challenge</h1>
      </a>
      </Link>
      </div>
        <div>
         {user?(
           <Link href="/account" >
             <a>{user.email}</a>
           </Link>
         ):(
           <Link href="/login">
             <a>Login</a>
           </Link>
         )}
        </div>
    </div>
  )
}