import { NavLink } from 'react-router-dom';
import { account, Loader } from '../../components/index';
import { useState } from "react"

export const LoginPage = () => {

    const [ loggedInUser, setLoggedInUser ] = useState(null);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoadind ] = useState(false)

    async function login(email: string, password: string) {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser( account.get() );
    }

    if (loading) {

        return <Loader loading />

    }

    return (
        <>
            <div className='flex flex-col items-center justify-center py-[30vh]'>

                <form className='flex flex-col items-center justify-center py-9 px-15 bg-violet-950 rounded-lg font-semibold'>
                    <p className='text-lg mb-3 px-15 mt-[-10px]'>Авторизация</p>
                    <input className='my-2 outline-none focus:border-2 rounded-lg bg-slate-700 py-2 px-2 border-green-500 invalid:border-red-500' type="email" placeholder="Почта" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='my-2 outline-none focus:border-2 rounded-lg bg-slate-700 py-2 px-2 border-green-500 invalid:border-red-500' type="password" minLength={8} maxLength={16} placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
                    <button  className='text-lg py-1 mt-3 border-2 border-violet-500 bg-black/20 cursor-pointer rounded-lg px-15 ' onClick={async () => {
                            setLoadind(true)
                            await login(email, password)
                            setLoadind(false)
                            location.href = "/"
                        }}>
                        Login
                    </button>
                    <NavLink className='text-lg py-1 mt-3 border-2 border-violet-500 bg-black/20 cursor-pointer rounded-lg px-15 underline decoration-2 decoration-purple-500' to="/register">Register</NavLink>
                </form>
            </div>
        </>
    )
}