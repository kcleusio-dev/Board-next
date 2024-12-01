import Head from 'next/head';
import styles from '../styles/styles.module.scss';
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firestore';


type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
}

interface HomeProps {
  data: string
}
export default function Home({ data }: HomeProps) {

  const [doadores, setDoadores] = useState<Data[]>(JSON.parse(data));
  return (
    <>
      <Head>
        <title>Board - Organizador de tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="Ferramenta Board" />

        <section className={styles.callToAction}>
          <h1>Uma ferramenta para o seu dia a dia, escreva, planeja e organiza...</h1>
          <p>
            <span>100% gratuita</span> e online
          </p>
        </section>

        {doadores.length !== 0 && <h3>Apoiadores:</h3>}
        <div className={styles.donaters}>
          {doadores.map(doador => (
            <img
              key={doador.image}
              src={doador.image}
              alt="Principal" />
          ))}

        </div>
      </main>


    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const doadores = await getDocs(collection(db, 'users'));
  const data = JSON.stringify(doadores.docs.map(u => {
    return {
      id: u.id,
      ...u.data(),
    }
  }))

  return {
    props: {
      data
    },
    revalidate: 60 * 60 //Actualiza após 60 minutos
  }
}