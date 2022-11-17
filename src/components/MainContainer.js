import "./MainContainer.css"
const MainContainer = (props) => {
    return (

        <div className="login">
            <div className="leftpart">
                <img className="logo" src="logo.png"  alt="logo"/>
                {props.leftPart}
            </div>
            <div className="rightpart">
                {props.rightPart}

            </div>

        </div>

    );
}
export default MainContainer;