import { useEffect, useState } from "react"
import { $api } from "../../api"
import { NavLink } from "react-router-dom"
import { Loader } from "../../components"

export const SchedulePage = () => {

    const [ titles, setTitles ] = useState()
    const [ loading, setLoadind ] = useState(true)

    useEffect(() => {
        $api.get('/anime/schedule/week').then(response => {
            setLoadind(true)
            setTitles(response.data)
            setLoadind(false)
        })
    }, [])

    console.log(titles)

    if (loading) {

        return <Loader loading />

    }

    

    return (
        <>
         <div className="grid xl:grid-cols-6 px-3 md:grid-cols-3 grid-cols-2 grid-cols-1 gap-5 py-3 rounded-xl">
            {titles && titles?.map(title => (
                <NavLink key={title?.release.publish_day.value} to={`/anime/${title?.release.alias}`} className="px-3 text-lg justify-items-center hover:border-purple-700 rounded-xl py-3 hover:border-3">
                    <h1 className="py-2 font-bold text-xl">{title?.release.publish_day.description}:</h1>
                    <img src={'https://anilibria.top' + title?.release.poster.src} alt="" />
                    <h1 className="text-center">{title?.release.name.main}</h1>
                </NavLink>
                
            ))}
        </div>
        </>
    )
}