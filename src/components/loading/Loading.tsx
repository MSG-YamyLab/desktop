import Logo from '../../assets/svg/logo.svg'
import "../../layouts/style.scss"


export const Loading = () => {
    return (
        <div className='w-screen h-screen  relative color-bg flex justify-center items-center'   >

            <img  className='animation' src = {Logo} />
        </div>
    )
}