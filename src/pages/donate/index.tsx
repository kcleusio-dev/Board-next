import { GetServerSideProps } from 'next';
import styles from './style.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js'
import { doc, setDoc } from 'firebase/firestore';
import db from '@/utils/firestore';



interface DonateProps {
    user: {
        nome: string;
        image: string;
        id: string;
    }
}

export default function Donate({ user }: DonateProps) {
    const [vip, setVip] = useState(false);
    async function handlerSAveDonate() {
        //const userRef = doc(db, 'tarefas', user.id);

        await setDoc(doc(db, 'users', user.id), {
            donate: true,
            lastDonate: new Date(),
            image: user.image
        }).then(() => {
            setVip(true);
        })
    }
    return (
        <>
            <Head>
                <title>Ajude a nossa plataforma a se manter online</title>
            </Head>
            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="Seja apoiador" />

                {vip && (
                    <div className={styles.vip}>
                        <img src={user.image} alt="" />
                        <span>Parabéns você é o novo apoiador!</span>
                    </div>
                )}

                <h1>Seja um apoiador deste projecto </h1>
                <h3>Contribua com apenas <span>1,00 USD</span></h3>
                <strong>Aparece na nossa Home e tenha funcionalidades exclusivas</strong>

                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '1'
                                }
                            }]
                        })
                    }}
                    onApprove={
                        (data, actions) => {
                            return actions.order?.capture().then(function (details) {
                                console.log('Compra aprovada: ' + details.payer?.name?.given_name);
                                handlerSAveDonate();

                            })
                        }
                    }
                />
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

    return {
        props: {
            user
        }
    }

}