import { useState, useEffect } from "react";
import { handleRequest } from '../request.js'
import { vetUrls } from "../constants.js";
import { EditDialog } from "../Dialog.js";
import { sortByLastName } from "../common.js";
import EditVetInfo from "../vets/EditVetInfo.js";
import VetInfo from "./VetInfo.js";
import NewButton from "../NewButton.js";

export function VetsSection({isVisible}){
    const [vets, setVets] = useState([]);
    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [newVet, setNewVet] = useState({});
    const [loadVets, setLoadVets] = useState(true);
    const [editedVetId, setEditedVetId] = useState(null);

    useEffect(()=> {
        if (loadVets){
        handleRequest('GET', vetUrls[0])
            .then(result => {
                setVets(result.sort(sortByLastName));
                setLoadVets(false);
                setNewVet({});
            });
        }
    }, [loadVets])

    useEffect(()=> {
        if (editedVetId){
            handleRequest('GET', vetUrls[1] + editedVetId)
            .then(result => {
                let reloadedVets = [...vets.filter(v => v.id != editedVetId)];
                reloadedVets.push(result);
                setVets(reloadedVets.sort(sortByLastName))
                setEditedVetId(null);
            });
        }
    }, [editedVetId])

    function handleSave() {
        handleRequest('POST', vetUrls[0], () => {
            setNewDialogOpen(false); 
            setLoadVets(true);
        }, newVet)
    }

    function handleDialogClose() {
        setNewVet({});
        setNewDialogOpen(false);
    }

    function getDialogContent() {
        return <EditVetInfo vet={newVet} setVet={setNewVet} setLoadVets={setLoadVets}/>;
    }

    let vetInfos = vets.map(vet => <VetInfo key={vet.id} vet={vet} setEditedVetId={setEditedVetId} setLoadVets={setLoadVets} onClick={() => setEditDialogOpen(true)}/>);
    vetInfos.push(<NewButton onClick= {() => {setNewDialogOpen(true)}}/>)

    return (
        <div className='section'>
            {isVisible && vetInfos}
            {<EditDialog title = 'Add Vet' open={newDialogOpen} loadContent={getDialogContent} handleSave={handleSave} handleClose={handleDialogClose}/>}
        </div>)
}