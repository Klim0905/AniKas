export const Loader = ({loading}: {loading: true}) => {
    return (
        <>
        <div className="absolute z-50 top-0 left-0 bg-gray-800 w-full h-full flex items-center justify-center">
            <div className="w-60 h-60 border-8 border-t-gray-800 q rounded-full animate-spin border-purple-600 "></div>
        </div>
        </>
    )
}