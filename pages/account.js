import Head from 'next/head'
import {useContext, useState,useEffect} from 'react'
import { API_URL } from '../utils/urls'
import Link from 'next/Link'
import AuthContext from '../context/AuthContext'

const useOrders = (user,getToken) =>{
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const fetchOrders = async () =>{
            if(user){
                try{
                    setLoading(true)
                    const token  = await getToken() 
                    const order_res = await fetch(`${API_URL}/orders`,{
                        headers:{
                            'Authorization':`Bearer ${token}`
                        }
                    })
                    const data = await order_res.json()
                    setOrders(data)
                }catch(err){
                    setOrders([])
                }
                setLoading(false)
            }
        }
        fetchOrders()
    },[user])

    return {orders,loading}
}

export default function Account(){
    const {user,logOutUser,getToken} = useContext(AuthContext)
    const {orders,loading} = useOrders(user,getToken)
    console.log(orders);
    if(!user){
        return(
            <div>
              <p>Please Login to continue</p>
              <Link href="/">Go Back</Link>
            </div>
        )
    }
        return(
           <div>
           <Head>
            <title>Account Page</title>
            <meta name ="description" content = "The account page,view your orders" />  
           </Head> 
           <h2>Account Page</h2>
           <h3>Your Orders</h3>
           {loading && <p>Loading Your Orders</p>}
           {orders.map(order=>(
               <div key={order.id} >
                   {new Date(order.created_at).toLocaleDateString('en-EN')} {order.product.name} ${order.total} {order.status}
               </div>
           ))}
           <hr/>
           <a onClick={logOutUser} href="#"> Logout </a>    
           <p>Logged In as : {user.email}</p>
           </div>
        )
    }