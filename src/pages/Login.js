import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css"
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import MainContainer from "../components/MainContainer";
/////////////imports



const Login = () => {

    const navigate = useNavigate();// initialise navigate


    useEffect(() => {
        auth.onAuthStateChanged((user) =>//navigate to home only if the user is logged in
        {
            if (user) {
                navigate("/Home")
            }

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleclick = () => {//function to login
        signInWithPopup(auth, provider)
            .then(() => {
                navigate("/Home")//navigate to home after succesful login



            })

    }
    const leftPart = (
        <div className="text">
            <h1>LOGIN</h1>
            <p>LOGIN
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.Button Title
            </p>
            <div className="gbutton">
                <GoogleButton onClick={handleclick} />
            </div>

        </div>

    );
    const rightPart = (<div className="rightpartlogin">

    </div>)
    return (
        <MainContainer leftPart={leftPart} rightPart={rightPart} />


    );
}
export default Login;






