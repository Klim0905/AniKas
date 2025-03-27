import { useEffect, useState } from "react"
import { $api } from "../../api"
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { account, databases, ID, Loader } from "../../components"
import { StarIcon } from "@heroicons/react/24/solid"
export const AnimePage = () => {  
    
    const { code } = useParams()
    const [ title, setTitle ] = useState()
    const [ activeEpisode, setActiveEpisode] =useState(1)
    const [ loading, setLoadind ] = useState(true)
    const [ favorites, setFavorites ] = useState(false)

    useEffect(() => {
        $api.get(`/anime/releases/${code}`).then(response => {
            setLoadind(true)
            setTitle(response.data)
            setLoadind(false)
        })
    }, [])

    databases.getDocument('67e3a5410034a65f4da3','67e3a564001e30935c6c','' + title?.id).then(response => setFavorites(response.AnimeFavorite))

    async function addFavorites() { await databases.createDocument(
        '67e3a5410034a65f4da3',
        '67e3a564001e30935c6c',
        '' + title?.id ,
        {AnimeTitle: title?.name.main,
        AnimePoster: 'https://anilibria.top/' + title?.poster.src,
        AnimeLink:  '' + code,
        AnimeFavorite: true,
        owner: (await account.get()).$id
        }
    )}

    async function delFavorites() { await databases.deleteDocument(
        '67e3a5410034a65f4da3',
        '67e3a564001e30935c6c', 
        '' + title?.id ,
    )}

    console.log(title);
    

    if (loading) {

        return <Loader loading/>

    }

    return (
        <>

            <title>{`Anikas: ${title?.name.main}`}</title>

            <div className="py-2 px-2">
                <h1 className="text-3xl truncate">{title?.name.main} :</h1>
                <div className="flex py-2 gap-5 max-lg:hidden ">
                    <img src={`https://anilibria.top/` + title?.poster.src} />
                    
                    <div className="border border-2 h-7 rounded-t-lg border-purple-400 border-b-transparent">
                        <div className="flex flex-col gap-2 py-2">
                            <span className="text-purple-300"><h1 className="px-3">Возрастной рейтинг: {title?.age_rating.label}</h1></span>                    
                            <span className="text-purple-300 border border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">Всего серий: {title?.episodes_total}</h1></span>                    
                            <span className="text-purple-300 border border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">Сезон: {title?.season.description}</h1></span>
                            <span className="text-purple-300 border border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">День публикации: {title?.publish_day.description}</h1></span>
                            <span className="text-purple-300 border border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">Жанры: </h1></span>
                            {title?.genres.map( genere => (<span className="text-purple-300 border border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-5">&#9679; {genere?.name}</h1></span>))}
                            <span className="text-purple-300 border rounded-b-lg border-t-transparent border-2 border-purple-400"><h1 className="px-3 mb-2">Год: {title?.year}</h1></span>
                        </div>
                    </div>
                    <div className="text-center items-center px-2 h-fit py-3 flex cursor-pointer" onClick={() => setFavorites(favorites === true ? (delFavorites(), databases.updateDocument('67e3a5410034a65f4da3','67e3a564001e30935c6c', '' + title?.id , {AnimeFavorite: false})) : addFavorites())}><StarIcon className={`w-[30px] transition-colors delay-60 ease-in-out ${favorites === true ? 'text-purple-700' : 'text-gray-200'}`}/> <h1 className={`text-center px-2 transition-colors delay-60 ease-in-out text-lg ${favorites === true ? 'text-purple-400' : 'text-gray-200'}`}>Добавить в избранные</h1> </div>
                 </div>

                 <div className="py-2 gap-5 lg:hidden mb-5 flex flex-col">
                    <img src={`https://anilibria.top/` + title?.poster.src}/>
                    <div className="text-center items-center px-2 h-fit py-3 flex cursor-pointer" onClick={() => setFavorites(favorites === true ? (delFavorites(), databases.updateDocument('67e3a5410034a65f4da3','67e3a564001e30935c6c', '' + title?.id , {AnimeFavorite: false})) : addFavorites())}><StarIcon className={`w-[30px] transition-colors delay-60 ease-in-out ${favorites === true ? 'text-purple-700' : 'text-gray-200'}`}/> <h1 className={`text-center px-2 transition-colors delay-60 ease-in-out text-lg ${favorites === true ? 'text-purple-400' : 'text-gray-200'}`}>Добавить в избранные</h1> </div>
                    <div className="border-2 h-7 rounded-t-lg border-purple-400 border-b-transparent box-border ">
                        <div className="flex flex-col gap-2 py-2 mb-auto">
                            <span className="text-purple-300"><h1 className="px-3">Возрастной рейтинг: {title?.age_rating.label}</h1></span>                    
                            <span className="text-purple-300  border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">Всего серий: {title?.episodes_total}</h1></span>                    
                            <span className="text-purple-300 border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">Сезон: {title?.season.description}</h1></span>
                            <span className="text-purple-300  border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">День публикации: {title?.publish_day.description}</h1></span>
                            <span className="text-purple-300  border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-3">Жанры: </h1></span>
                            {title?.genres.map( genere => (<span className="text-purple-300 border border-t-transparent border-2 border-b-transparent border-purple-400"><h1 className="px-5">&#9679; {genere?.name}</h1></span>))}
                            <span className="text-purple-300 rounded-b-lg border-t-transparent border-2 border-purple-400"><h1 className="px-3 mb-2">Год: {title?.year}</h1></span>
                        </div>

                    </div>
                 </div>
                <div className="flex flex-col py-3 max-lg:hidden ">
                    <p className="text-lg leading-relaxed ">{title?.description}</p>
                </div>
                <div className="py-5 px-3  lg:hidden mt-[50vh] items-center">
                    <p className="text-lg leading-relaxed w-full break-words overflow-auto" >{title?.description}</p>
                </div>

                <div className="py-3 bg-gray-950/50 px-3 rounded-xl w-fit lg:hidden">
                    <select
                        value={activeEpisode}
                        onChange={e => setActiveEpisode(Number(e.target.value))}
                        className=' bg-purple-900 p-2 rounded-lg outline-none cursor-pointer'
                    >
                    {title?.episodes.map( episode => (
                            <option value={episode?.ordinal} >{episode?.ordinal} Серия</option>
                        ))}
                    </select>
                        {title?.episodes.map( episode => (
                        <div key={episode?.id} className="mt-2">
                        {episode?.ordinal == activeEpisode ? (
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                url={episode.hls_1080}
                                controls
                            />
                            ) : null}
                            
                        </div>
                    ))}


                </div>

                
                <div className="py-3 bg-gray-950/50 px-3 rounded-xl w-fit max-lg:hidden">
                    <select
                        value={activeEpisode}
                        onChange={e => setActiveEpisode(Number(e.target.value))}
                        className=' bg-purple-900 p-2 rounded-lg outline-none cursor-pointer'
                    >
                    {title?.episodes.map( episode => (
                            <option value={episode?.ordinal} >{episode?.ordinal} Серия</option>
                        ))}
                    </select>
                        {title?.episodes.map( episode => (
                        <div key={episode?.id} className="mt-">
                        {episode?.ordinal == activeEpisode ? (
                            <ReactPlayer
                                url={episode.hls_1080}
                                controls
                            />
                            ) : null}
                            
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}
