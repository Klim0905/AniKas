import { XMarkIcon } from "@heroicons/react/24/outline"

export const Modals = ({isOpen, onClose, children}) => {
    return (
        <>{isOpen &&  (
            <div className="fixed top-0 left-0 w-[100%] h-[100%] bg-black/75 overflow-hidden overflow-y-auto transition-y-[-50px] transition-opacity duration-700 ease-out z-[999]">
                <div className="absolute top-0 left-0 flex justify-center items-center w-[100%]  min-h-[100%]">
                    <div className="relative m-5 w-[100%] max-w-[600px] rounded-[20px] bg-gray-800 p-5 pt-10 transition-y-[-50px] transition-all duration-500  ease-out  ">
                        <button className="absolute top-4 right-4 w-[30px] h-[30px] p-0 bg-gray-900 rounded-lg text-lg" onClick={onClose}>
                            <XMarkIcon className="w-[30px]"/>
                        </button>
                        <div className="py-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}