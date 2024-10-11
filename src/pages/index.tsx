import Head from 'next/head';
import styles from '../styles/styles.module.scss';
import React from 'react';
import { GetStaticProps } from 'next';



export default function Home() {
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

        <div className={styles.donaters}>
          <img src="https://sujeitoprogramador.com/steve.png" alt="Principal" />
          <img src="https://sujeitoprogramador.com/steve.png" alt="Principal" />
        </div>
      </main>


    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}, revalidate: 60 * 60 //Actualiza após 60 minutos
  }
}