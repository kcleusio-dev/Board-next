import Head from "next/head"
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import styles from './styles.module.scss';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "@/components/SupportButton";



export default function Board() {
    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title >
            </Head>
            <main className={styles.container}>
                <form>
                    <input
                        type="text"
                        placeholder="Digita sua tarefa..."
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
    


    if (!session) {
        //se usuário não logado redirecionar...
        return {
            redirect: {
                destination: '/',
                permanent: false
            }

        }
    }

    console.log(session?.user);

    return {
        props: {}
    }

}