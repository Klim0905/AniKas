import { useEffect, useState } from "react"
import { account, databases, Loader } from "../../components"
import { NavLink } from "react-router-dom"
import { Query } from "appwrite"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"

export const ProfilePage = () => {
    
    
    const [ titles, setTitles ] = useState()
    const [ id, setid] = useState()
    const [ loading, setLoadind ] = useState(true)

    useEffect( () => {
        setLoadind(true)
        account.get().then(response => setid(response))
        databases.listDocuments('67e3a5410034a65f4da3','67e3a564001e30935c6c', [Query.equal("owner", id?.$id)]).then( response => setTitles(response?.documents))
        setLoadind(false)
    }, [id?.$id])

    if (loading) {

        return <Loader loading/>

    }

    return (
        <>
        <button onClick={async() => await account.deleteSession("current")} className="mb-2 ml-2 mt-5 cursor-pointer flex items-center justify-center text-lg font-semibold"><ArrowRightStartOnRectangleIcon className="w-[30px] mr-2" />Выход</button>
        <div>
            <h1 className="text-2xl font-bold px-3 py-3">избранные: </h1>
            <div className="grid xl:grid-cols-6 px-3 md:grid-cols-3 grid-cols-2 gap-5 py-3 grid-cols-1 bg-gray-950/50 rounded-xl">
                {titles && titles.map(title => (
                    <NavLink to={`/anime/${title.AnimeLink}`} className="px-3 text-lg justify-items-center hover:border-purple-700 rounded-xl py-3 hover:border-3">
                        <img src={title.AnimePoster} alt="" />
                        <h1 className="text-center">{title.AnimeTitle}</h1>
                    </NavLink>
                ))}
            </div>
        </div>
        </>
    )
}
