import Head from "next/head";
import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import styles from './styles.module.scss';
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "@/components/SupportButton";
import db from "@/utils/firestore";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { format } from 'date-fns';

type TaskList = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    tarefa: string;
    userId: string;
    nome: string;
}

interface BoardProps {
    user: {
        id: string;
        nome: string;
    }
    data: string;
}

export default function Board({ user, data }: BoardProps) {

    const [input, setInput] = useState('');
    const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));

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
                console.log('Registo realizado com sucesso!');
                const data = {
                    id: doc.id,
                    created: new Date(),
                    createdFormated: format(new Date(), 'dd MMM yyyy'),
                    tarefa: input,
                    userId: user.id,
                    nome: user.nome
                };

                setTaskList([...taskList, data]);
                setInput('');
            })
            .catch((err) => {
                console.log('Erro ao registar tarefa', err);
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

                <h1>Você tem {taskList.length} {taskList.length === 1 ? 'Tarefa' : 'Tarefas'}</h1>

                <section>
                    {taskList && taskList.map(task => (

                        < article key={task.id}
                            className={styles.taskList}
                        >

                            <Link href={`/board/${task.id}`}>
                                <p>{task.tarefa}</p>
                            </Link>
                            <div className={styles.actions}>
                                <div>
                                    <div>
                                        <FiCalendar size={20} color="#FFB800" />
                                        <time>{task.createdFormated}</time>
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
                    ))}

                </section>

            </main >

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

    //console.log(session);

    if (!session?.token.sub) {
        //se usuário não logado, redirecionar...
        return {
            redirect: {
                destination: '/',
                permanent: false
            }

        }
    }

    //pegar tarefas from firebase
    /*
    const tasks = await firebase.firestore().collection('tarefas')
    .where('userId','==',session?.token.sub)
    .orderBy('created', 'asc').get();
    */

    const task = query(collection(db, 'tarefas'), where('userId', '==', session?.token.sub));

    const tasks = await getDocs(task);
    const data = JSON.stringify(tasks.docs.map(u => {
        return {
            id: u.id,
            createdFormated: format(u.data().created.toDate(), 'dd MMM yyyy'),
            ...u.data(),
        }
    }))

    const user = {
        nome: session?.token.name ?? null,
        id: session?.token.sub ?? null
    }

    return {
        props: {
            user,
            data
        }
    }

}