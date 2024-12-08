import db from "@/utils/firestore";
import { doc, getDoc, } from "firebase/firestore";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { format } from "date-fns";

import styles from './task.module.scss';
import Head from "next/head";
import { FiCalendar } from 'react-icons/fi';



type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
}

interface TaskListProps {
  data: string
}


export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;

  return (
    <>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <article className={styles.contanier}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={30} color="#FFF" />
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { id } = params;
  const session = await getSession({ req });

  if (!session?.vip) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  const docRef = doc(db, 'tarefas', id);
  const data = await getDoc(docRef).then(documentSnapshot => {
    const data = {
      id: documentSnapshot.id,
      created: documentSnapshot.data().created,
      createdFormated: format(documentSnapshot.data().created.toDate(), 'dd MMMM yyyy'),
      tarefa: documentSnapshot.data().tarefa,
      userId: documentSnapshot.data().userId,
      nome: documentSnapshot.data().nome
    }

    return JSON.stringify(data);
  });

  return {
    props: {
      data
    }
  }
}