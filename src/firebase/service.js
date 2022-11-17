import { auth, database } from "./firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";




export const addTask = (title, description) => {//adding task to database
    const taskId = uid();
    if (title === "") {
        return
    }
    set(ref(database, '/' + auth.currentUser.uid + '/' + taskId), { id: taskId, title: title, desc: description, favorite: false, completed: false, deleted: false })
}

export const setFav = (id, favstatus) => {//setting favaourite in database
    if (favstatus) {
        update(ref(database, '/' + auth.currentUser.uid + '/' + id), { favorite: false })

    }
    else {
        update(ref(database, '/' + auth.currentUser.uid + '/' + id), { favorite: true })
    }
}

export const setDel = (id) => {//setting delete in database
    update(ref(database, '/' + auth.currentUser.uid + '/' + id), { deleted: true });
}

export const setComp = (id, compStatus) => {//setting as completed in database
    if (compStatus) {
        update(ref(database, '/' + auth.currentUser.uid + '/' + id), { completed: false })

    }
    else {
        update(ref(database, '/' + auth.currentUser.uid + '/' + id), { completed: true })
    }
}

export const setRestore = (id) => {//reverting delete in database
    update(ref(database, '/' + auth.currentUser.uid + '/' + id), { deleted: false });

}