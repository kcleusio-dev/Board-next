import { GetServerSideProps } from 'next';
import styles from './style.module.scss';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

interface DonateProps {
    user: {
        nome: string;
        image: string;
        id: string;
    }
}

export default function Donate({ user }: DonateProps) {
    return (
        <>
            <Head>
                <title>Ajude a nossa plataforma a se manter online</title>
            </Head>
            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="Seja apoiador" />

                <div className={styles.vip}>
                    <img src={user.image} alt="" />
                    <span>Parabéns você é o novo apoiador!</span>

                </div>

                <h1>Seja um apoiador deste projecto </h1>
                <h3>Contribua com apenas <span>10,00 AOA</span></h3>
                <strong>Aparece na nossa Home e tenha funcionalidades exclusivas</strong>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
        }
    }

    const user = {
        id: session?.id ?? null,
        nome: session?.token.name ?? null,
        image: session?.token.picture ?? null
    }

   console.log(user)

    return {
        props: {
            user
        }
    }

}