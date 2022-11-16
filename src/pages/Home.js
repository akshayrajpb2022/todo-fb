
import { auth,database} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { useState,useEffect } from "react";
import { onValue,ref } from "firebase/database";
import "./Home.css"
import { addTask } from "../firebase/service";
import ListItems from "../components/ListItems";
import { getAuth } from "firebase/auth";
import {MdLogout} from 'react-icons/md'



const Home = () => {

    const [ titleinput, settitleinput ] = useState('');
    const [ descinput, setdescinput ] = useState('');
    const [ values, setvalues ] = useState([]);
    const [filteredvalue,setfilteredvalue] = useState([]);
    const [ query,setquery ]= useState('');
    const [ view,setview ] = useState('all');
    const[username,setusername]= useState('');
    

    //adding tasks to database
    

    useEffect(()=>
    {
        
        let displayvalues = values.filter((v)=>v.title.toLowerCase().includes(query.toLowerCase()));
        if(view=="deleted")
        {
            displayvalues=displayvalues.filter((item)=>item.deleted);
        }
        else{
            displayvalues = displayvalues.filter((item)=>!item.deleted);
            if(view!="all")
            {
                displayvalues=displayvalues.filter((item)=>item[view])

            }
        }
        
        setfilteredvalue(displayvalues);
        

    },[values,query,view])

    useEffect(()=>
    {
        

        auth.onAuthStateChanged((user)=>
        {
            if(user)
            {
                onValue(ref(database,'/'+auth.currentUser.uid),(snapshot)=>
                {
                    const data = Object.values(snapshot.val());
                    setvalues(data);
                   
                })
              
                setusername(user.displayName);
                
            }
            else if (!user)
            {
                navigate("/");

            }


        })
     
        

    },[])
    
    const navigate = useNavigate();
    
    
    
    const signout =()=>
    {
        auth.signOut()
        .then(()=>
        {
            navigate("/");

        })

    }

    const leftPart = (<div className="leftdiv">
        <h1>TODO</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. </p>
        <div className="textandbutton">
        <input type="text" placeholder="Title" value = { titleinput } onChange = {(e) => settitleinput(e.target.value)} />
        <input type ="text" placeholder="Description" value = { descinput } onChange = {(e) => setdescinput(e.target.value)}/>
        <div className="addbutton">
        <button onClick={()=>addTask(titleinput,descinput)}>Add</button>
        </div>
        </div>
    </div>)

    const rightPart = (<div className="rightdiv">
        <div className="topbar">
        <h1>TODO LIST</h1>
        <div className="rightcontent">
        <h2>Hey {username}</h2>
        <MdLogout onClick={signout} />
        </div>
        </div>
        <div className="searchanddrop">
        <div className="searchbar">
            <input type="text" placeholder="Search" value={query} onChange={(e)=>setquery(e.target.value)}/>
        </div>
        <div className="selectitem">
            <select value={view} onChange={(e)=>setview(e.target.value)}>
                <option value='all'>all</option>
                <option value= 'favorite'>favourites</option>
                <option value='completed'>completed</option>
                <option value='deleted'>deleted</option>
                
            </select>
        </div>
        </div>
        {filteredvalue.map((item) => (
            <ListItems item={item}/>
        ))}

    </div>)
    return(
        <div>

            <MainContainer  leftPart={leftPart} rightPart={rightPart}/>
        

        </div>
        
        
    );
}
export default Home;