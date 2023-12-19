import { useState, useEffect } from "react";
import { handleRequest } from '../request.js'
import { catUrls } from "../constants.js";
import { EditDialog } from "../Dialog.js";
import { sortByBirthDate } from "../common.js";
import NewButton from "../NewButton.js";
import CatInfo from "./CatInfo.js";
import EditCatInfo from "./EditCatInfo.js";

export default function CatsSection({isVisible, cats, dispatchCats}){
    const [loadCats, setLoadCats] = useState(true);
    const [editedCatId, setEditedCatId] = useState(null);
    const [newCat, setNewCat] = useState({});
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    useEffect(()=> {
        if (loadCats){
        handleRequest('GET', catUrls[0])
            .then(result => {
                dispatchCats({
                    type: 'loadedCats',
                    loadedCats:result.sort(sortByBirthDate)
                });
                setLoadCats(false);
                setNewCat({});
            });
        }
    }, [loadCats])

    useEffect(()=> {
        if (editedCatId){
            handleRequest('GET', catUrls[1] + editedCatId)
            .then(result => {
                let reloadedCats = [...cats.filter(c => c.id != editedCatId)];
                reloadedCats.push(result);
                dispatchCats({
                    type:'loadedCats',
                    loadedCats: reloadedCats.sort(sortByBirthDate)
                })
                setEditedCatId(null);
            });
        }
    }, [editedCatId])

    function handleSave() {
        handleRequest('POST', catUrls[0], () => {
            setNewDialogOpen(false); 
            setLoadCats(true);
        }, newCat)
    }

    function handleDialogClose() {
        setNewCat({});
        setNewDialogOpen(false);
    }

    function getDialogContent() {
        return <EditCatInfo cat={newCat} setCat={setNewCat} setLoadCats={setLoadCats}/>;
    }

    let catInfos = cats.map(cat => <CatInfo key={cat.id} cat={cat} setLoadCats={setLoadCats} setEditedCatId ={setEditedCatId}/>);
    catInfos.push(<NewButton onClick= {() => {setNewDialogOpen(true)}}/>);
    return (
        <div className='section'>
            {isVisible && catInfos}
            {<EditDialog title = 'Add Cat' open={newDialogOpen} loadContent={getDialogContent} handleClose={handleDialogClose} handleSave={handleSave}/>}
        </div>)
}