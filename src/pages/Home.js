
import { auth, database } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import "./Home.css"
import { addTask } from "../firebase/service";
import ListItems from "../components/ListItems";
import { getAuth } from "firebase/auth";
import { MdLogout } from 'react-icons/md'



const Home = () => {

    const [titleinput, settitleinput] = useState('');//state for title
    const [descinput, setdescinput] = useState('');//state for description
    const [values, setvalues] = useState([]);//state for values fetched from database
    const [filteredvalue, setfilteredvalue] = useState([]);//state for filtered values according to our view
    const [query, setquery] = useState('');//state for query from search field
    const [view, setview] = useState('all');//state for view from the dropdown menu
    const [username, setusername] = useState('');//state for user details
    const navigate = useNavigate();//navigate


    //adding tasks to database


    useEffect(() => {//to filter values according to the view

        let displayvalues = values.filter((v) => v.title.toLowerCase().includes(query.toLowerCase()));
        if (view === "deleted") {
            displayvalues = displayvalues.filter((item) => item.deleted);
        }
        else {
            displayvalues = displayvalues.filter((item) => !item.deleted);
            if (view !== "all") {
                displayvalues = displayvalues.filter((item) => item[view])

            }
        }

        setfilteredvalue(displayvalues);


    }, [values, query, view])

    useEffect(() => {//to get  data from database and to update user info



        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(database, '/' + auth.currentUser.uid), (snapshot) => {
                    const data = Object.values(snapshot.val());
                    setvalues(data);

                })

                setusername(user.displayName);

            }
            else if (!user) {
                navigate("/");

            }


        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    const signout = () => {//signout

        auth.signOut()
            .then(() => {
                navigate("/");

            })

    }

    const leftPart = (<div className="leftdiv">
        <h1>TODO</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. </p>
        <div className="textandbutton">
            <input type="text" placeholder="Title" value={titleinput} onChange={(e) => settitleinput(e.target.value)} />
            <input type="text" placeholder="Description" value={descinput} onChange={(e) => setdescinput(e.target.value)} />
            <div className="addbutton">
                <button onClick={() => addTask(titleinput, descinput)}>Add</button>
            </div>
        </div>
    </div>)

    const rightPart = (<div className="rightdiv">
        <div className="topbar">
            <h1>TODO LIST</h1>
            <div className="rightcontent">
                <h2>Hey,  {username}</h2>
                <MdLogout onClick={signout} />
            </div>
        </div>
        <div className="searchanddrop">
            <div className="searchbar">
                <input type="text" placeholder="Search" value={query} onChange={(e) => setquery(e.target.value)} />
            </div>
            <div className="selectitem">
                <select value={view} onChange={(e) => setview(e.target.value)}>
                    <option value='all'>all</option>
                    <option value='favorite'>favourites</option>
                    <option value='completed'>completed</option>
                    <option value='deleted'>deleted</option>

                </select>
            </div>
        </div>
        {filteredvalue.map((item) => (
            <div key={item.id}>
                <ListItems item={item} />
            </div>
        ))}

    </div>)
    return (
        <div>

            <MainContainer leftPart={leftPart} rightPart={rightPart} />


        </div>


    );
}
export default Home;