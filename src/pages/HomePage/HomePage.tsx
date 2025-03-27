import { useEffect, useState } from "react"
import { $api } from "../../api"
import { NavLink } from "react-router-dom"
import { account, databases, Loader } from "../../components"
import { Query } from "appwrite"


export const HomePage = () => {

    const [ titles, setTitles ] = useState()
    const [ loading, setLoadind ] = useState(true)
    

    useEffect(() => {
        $api.get('/anime/releases/latest', {
            params: {
                limit: 6
            }
        }).then(response => {
            setLoadind(true)
            setTitles(response.data)
            setLoadind(false)
        })
    }, [])

    if (loading) {

        return <Loader loading/>

    }

    return (
        <>
            <div className="py-2 px-2">
                <div className="">
                    <h1 className="text-2xl font-bold px-3 py-3">Новые Эпизоды:</h1>
                    <div className="grid xl:grid-cols-6 px-3 md:grid-cols-3 grid-cols-2 gap-5 py-3 bg-gray-950/50 rounded-xl">
                        {titles && titles?.map(title => (
                        <NavLink to={`anime/${title?.alias}`} className="px-3 text-lg justify-items-center hover:border-purple-700 rounded-xl py-3 hover:border-3">
                            <img src={'https://anilibria.top' + title?.poster.src} alt="" />
                            <h1 className="text-center">{title?.name.main}</h1>
                        </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}