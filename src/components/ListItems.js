import "./ListItems.css";
import { MdOutlineDelete, MdFavoriteBorder, MdCheckCircleOutline, MdSettingsBackupRestore } from "react-icons/md";
import { setFav, setDel, setComp, setRestore } from "../firebase/service";


const ListItems = (props) => {
    const item = props.item;//individual item
    const strikestyle = {//strike text whether completed or not
        textDecoration: "line-through"
    }

    const nonstrikestyle = {
        textDecoration: "none"
    }

    return (
        <div className="listitems">
            <div className="textpart">
                <h3 style={item.completed ? strikestyle : nonstrikestyle}>{item.title}</h3>
                <p>{item.desc}</p>

            </div>
            <div className="icons">
                {item.deleted && <MdSettingsBackupRestore onClick={() => setRestore(item.id)} />}
                {!item.deleted && <MdOutlineDelete onClick={() => setDel(item.id)} />}
                <MdFavoriteBorder onClick={() => setFav(item.id, item.favorite)} color={item.favorite ? "red" : "black"} />
                <MdCheckCircleOutline onClick={() => setComp(item.id, item.completed)} color={item.completed ? "green" : "black"} />
            </div>
        </div>
    );

}
export default ListItems;