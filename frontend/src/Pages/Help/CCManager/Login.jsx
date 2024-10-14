import signupImg from '../../../../public/loginImg.png'
import LoginForm from '../../../Components/Help/LoginForm'

const LogIn = () => {
    return (
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-30">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d0ff57/30,transparent)]"></div>
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="grid items-center grid-cols-2">
                    <div>
                        <img src={signupImg} alt="SignUp Img" />
                    </div>
                    <div className="-mt-[4rem]">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn
