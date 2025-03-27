import { useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { $api } from "../../api"
import { Modals } from "../Modal/Motal"
import { Bars3Icon, Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { UserIcon } from "@heroicons/react/24/outline"
import { account, storage } from ".."

export const Layout = () => {

    const resultIMG = storage.getFileView(
        "67e373010024a7f60a5d", // bucketId
        "67e3733a0005c20e6766"
      );    

    const [ animeRandom, setAnimeRandom ] = useState('')
    const [ search, setSearch ] = useState()
    const [ titles, setTitles ] = useState()
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [active, setActive] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        $api.get('/anime/releases/random?limit=1').then(response => {
            setAnimeRandom(response.data[0])
            
        })
    }, [])

    const getSearch = () => {
        $api.get('/app/search/releases', {
            params: {
                query: search
            }
        }).then(response => setTitles(response.data))
    }

    return (
        <>
        <header className="sticky top-0 left-0 ">
            <nav className="max-lg:hidden flex justify-between px-5 py-2 bg-gray-900 text-3xl font-bold z-10 ">
                <NavLink to="/" className="flex bg-linear-to-r from-fuchsia-800 to-purple-700 text-transparent bg-clip-text"><img className="w-[42px] translate-y-[-2px]" src={resultIMG} alt="" />AniKas</NavLink>
                <form className="flex" onSubmit={e => {
                    e.preventDefault()
                    getSearch()}}>
                    <div className="flex bg-gray-800 items-center justify-items-center rounded-lg">
                        <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Введите название аниме " className="w-100 text-lg h-full font-semibold text-center outline-none focus:border-3 border-gray-950 text-slate-400 rounded-lg"/> 
                    </div>
                    <button className="px-2 text-lg" onClick={showModal}><MagnifyingGlassIcon className="w-[30px] text-slate-300"/></button>

                </form>
                <div className=" gap-5 flex text-lg items-center font-semibold action:text-purple-900">
                    <NavLink to="/schedule" className="hover:text-purple-500 ease-in duration-300">Schedule</NavLink>
                    <NavLink to="/releases" className="hover:text-purple-500 ease-in duration-300">Releases</NavLink>
                    <NavLink to="/setting" className="hover:text-purple-500 ease-in duration-300"><Cog6ToothIcon className="w-[30px]"/></NavLink>
                    <NavLink to="/profile" className="hover:text-purple-500 ease-in duration-300"><UserIcon className="w-[30px]"/></NavLink>
                    <NavLink to={`/anime/${animeRandom?.alias}`} onClick={() =>{setTimeout(() => {window.location.reload()},200)}} className="hover:text-purple-500 ease-in duration-300">Random</NavLink>
                </div>
            </nav>
            <nav className="lg:hidden flex justify-between w-full px-1 py-2 bg-gray-900 text-3xl font-bold z-10 ">
                <NavLink to="/" className="flex"><img className="h-[42px] translate-y-[-2px]" src={resultIMG} alt="" /><h1 className="mr-2 text-transparent">AK</h1></NavLink>
                <form className="flex" onSubmit={e => {
                    e.preventDefault()
                    getSearch()}}>
                    <div className="flex bg-gray-800 items-center justify-items-center rounded-lg">
                        <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Введите название аниме " className="truncate w-full text-lg h-full font-semibold text-center outline-none focus:border-3 border-gray-950 text-slate-400 rounded-lg"/> 
                    </div>
                    <button className="px-2 text-lg" onClick={showModal}><MagnifyingGlassIcon className="w-[30px] text-slate-300"/></button>

                </form>
                <div className=" gap-5 flex text-lg items-center font-semibold action:text-purple-900">
                    <button><Bars3Icon className="w-[30px]" onClick={() => {setActive(active ? false : true) 
                        console.log(active)}}/></button>

                </div>
            </nav>
        </header>
        
        <div className={`absolute top-0 left-0 w-full h-full mt-[58px] duration-700 ease-in-out ${active ? "translate-x-0" : "-translate-x-full"}`}>
            <nav className=" bg-gray-800 w-full h-full container flex flex-col gap-5 text-lg font-semibold action:text-purple-900 py-5 px-5">
                <NavLink to="/schedule" className="hover:text-purple-500 ease-in duration-300">Расписание</NavLink>
                <NavLink to="/releases" className="hover:text-purple-500 ease-in duration-300">Релизы</NavLink>
                <NavLink to="/setting" className="hover:text-purple-500 ease-in duration-300">Настройки</NavLink>
                <NavLink to="/profile" className="hover:text-purple-500 ease-in duration-300">Профиль</NavLink>
                <NavLink to={`/anime/${animeRandom?.alias}`} onClick={() =>{setTimeout(() => {window.location.reload()},200)}} className="hover:text-purple-500 ease-in duration-300">Рандомное аниме</NavLink>
            </nav>
        </div>

        <Outlet />
        <Modals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="grid xl:grid-cols-3 grid-cols-2">
                        {titles && titles?.map(title => (
                            <NavLink  to={`anime/${title?.alias}`} onClick={() => 
                                {
                                setIsModalOpen(false)
                                setTimeout(() => {
                                    window.location.reload()
                                }, 200);
                                
                                }} className="px-3 text-lg justify-items-center hover:border-purple-700 rounded-xl py-3 hover:border-3">
                                <img  src={'https://anilibria.top' + title?.poster.src} alt="" />
                                <h1 className="text-center text-white" >{title?.name.main}</h1>
                            </NavLink>
                            ))}
                        </div>
                </Modals>
        </>
    )

}
