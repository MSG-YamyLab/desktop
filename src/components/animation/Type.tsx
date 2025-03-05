import "./style.scss"



export const Type = () => {
    return (
        <div className="flex gap-2 items-center">
            <div className="flex gap-1">
            <div className="ball rounded-full w-[5px] h-[5px]"></div>
            <div className="ball rounded-full w-[5px] h-[5px]"></div>
            <div className="ball rounded-full w-[5px] h-[5px]"></div>
            </div>

            <div className="font-normal text-sm text-side-300">typing...</div>
        </div>
    )
}