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
        <link rel="icon" href="/Image Only.png" />
      </Head>

      {/* <main className={styles.main}> */}
        <Scroller />
      {/* </main>  */}
    </div>
  )
}
