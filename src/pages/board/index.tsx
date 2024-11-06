import Head from "next/head";
import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import styles from './styles.module.scss';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "@/components/SupportButton";
import db from "@/utils/firestore";
import { collection, addDoc } from "firebase/firestore";

interface BoardProps {
    user: {
        id: string;
        nome: string;
    }
}

export default function Board({ user }: BoardProps) {

    const [input, setInput] = useState('');
    
    //console.log(user.nome); 

    async function handleAddTask(e: FormEvent) {
        e.preventDefault();

        if (input === '') {
            alert('Preencha alguma tarefa!');
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            created: new Date(),
            tarefa: input,
            userId: user.id,
            nome: user.nome
        })
            .then((doc) => {
                console.log('Registo realizado com sucesso!')
            })
            .catch((err) => {
                console.log('Erro ao registar', err);
            })


    }

    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title >
            </Head>
            <main className={styles.container}>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Digita sua tarefa..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />
                    </button>
                </form>

                <h1>Você tem 2 tarefas</h1>

                <section>
                    <article className={styles.taskList}>
                        <p>Aprender a criar projectos com Next JS e aplicando banckend Firebase</p>
                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#FFB800" />
                                    <time>07 de Julho de 2024</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color="#FFF" />
                                    <span>Editar</span>
                                </button>
                            </div>

                            <button>
                                <FiTrash size={20} color="#FF3636" />
                                <span>Excluir</span>
                            </button>
                        </div>

                    </article>
                </section>

            </main>

            <div className={styles.vipContanier}>
                <h3>Obrigado por apoiar nosso projecto.</h3>
                <div>
                    <FiClock size={28} color="#FFF" />
                    <time>
                        Última doação foi a 7 dias.
                    </time>
                </div>
            </div>
            <SupportButton />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });

    console.log(session);

    if (!session) {
        //se usuário não logado, redirecionar...
        return {
            redirect: {
                destination: '/',
                permanent: false
            }

        }
    }
    console.log(session.user)

    const user = {
        nome: session?.user?.name ?? null,
        id: session?.id ?? null
    }

    return {
        props: {
            user
        }
    }

}