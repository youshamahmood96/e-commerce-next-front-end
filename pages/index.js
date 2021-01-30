import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {fromImageToUrl,API_URL} from '../utils/urls'
import Link from 'next/Link'
import { twoDecimals} from '../utils/format'
export default function Home({ products }) {
  return (
    <div >
      <Head>
        <title>E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.map(pd=>(
        <div key={pd.name} className={styles.product} >
        <Link href={`/products/${pd.slug}`} >
        <a>
          <div className={styles.product__Row} >
            <div className={styles.product__ColImg} >
            <img src={fromImageToUrl(pd.image)} alt=""/>
            </div>
            <div className={styles.product__Col}>
            {pd.name} ${twoDecimals(pd.price)}
            </div>
          </div>
          </a>
          </Link>
        </div>
      ))}

    </div>
  )
}
export async function getStaticProps(){
  //Fetch
  const product_res = await fetch(`${API_URL}/products/`)
  const products = await product_res.json()
  //Return
  return {
    props:{
      products
    }
  }
}
