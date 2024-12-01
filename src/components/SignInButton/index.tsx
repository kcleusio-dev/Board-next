import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';


export function SignInButton() {

    //const [session] = useSession(); "https://avatars.githubusercontent.com/u/144366835?v=4"

    const { data: session } = useSession();

    return session ? (
        <button
            type='button'
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <img src={session.token?.picture} alt="Helder" />
            Olá, {session.token?.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button
            type='button'
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub
                color="#FFB800" />
            Entrar com github
        </button>
    )
}