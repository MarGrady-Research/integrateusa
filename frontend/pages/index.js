import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronDoubleRightIcon, ChevronDoubleDownIcon} from '@heroicons/react/20/solid';
import Scroller from '../components/Scroll/Scroller';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronDoubleRightIcon, ChevronDoubleDownIcon} from '@heroicons/react/20/solid';
import Scroller from '../components/Scroll/Scroller';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div >
    <div >
      <Head>
        <title>IntegrateUSA</title>
        <meta name="description" content="Exploring school segregation" />
        <link rel="icon" href="/Image Only.png" />
        <link rel="icon" href="/Image Only.png" />
      </Head>

      <Scroller />
     
    </div>
  )
}
