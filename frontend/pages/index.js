import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronDoubleRightIcon, ChevronDoubleDownIcon} from '@heroicons/react/20/solid';
import Scroller from '../components/Scroll/Scroller';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Integrate USA</title>
        <meta name="description" content="Exploring school segregation" />
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>

      <main className={styles.main}>
        
        {/* <div className='flex flex-col items-center mx-auto'>
          
        <div className='inline-flex items-center'>
        <Image src="/mg_logo_cropped.png" 
                        alt="margrady logo"
                        width = {100}
                        height={80}/>
        <span className="ml-3 text-3xl font-raleway">IntegrateUSA</span>
        </div>

        <Link href='/info'>
        <span className='inline-flex items-center hover:text-gray-500 hover:cursor-pointer font-raleway py-5'>Explore the dashboard <ChevronDoubleRightIcon className='h-5 w-5'/></span> 
        </Link>
  
        <div className='py-5 flex items-center'>
        <span className='font-raleway'>Or scroll through the story </span>
        <div>
        <ChevronDoubleDownIcon className='w-5 h-5'/>
        </div>
        </div>

        </div> */}
        <Scroller />

      </main> 
    </div>
  )
}
