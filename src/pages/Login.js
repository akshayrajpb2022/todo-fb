import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css"
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    
   

    const handleclick = () => {
        signInWithPopup(auth, provider)
            .then(() => {
              
            })

    }
    return (
        <div className="login">
            <div className="leftpart">
                <img className="logo" src="logo.png" />
                <div className="text">
                    <h1>LOGIN</h1>
                    <p>LOGIN
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.Button Title
                    </p>
                    <div className="gbutton">
                        <GoogleButton onClick={handleclick} />
                    </div>

                </div>
            </div>
            <div className="rightpart">

            </div>

        </div>


    );
}
export default Login;


