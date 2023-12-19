import { useState, useEffect } from "react";
import { handleRequest } from '../request.js'
import { ownerUrls } from "../constants.js";
import { EditDialog } from "../Dialog.js";
import { sortByLastName } from "../common.js";
import NewButton from "../NewButton.js";
import OwnerInfo from './OwnerInfo.js';
import EditOwnerInfo from "../owners/EditOwnerInfo.js";

export function OwnersSection({isVisible}){
    const [owners, setOwners] = useState([]);
    const [loadOwners, setLoadOwners] = useState(true);
    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [editedOwnerId, setEditedOwnerId] = useState(null);
    const [newOwner, setNewOwner] = useState({});

    useEffect(()=> {
        if (loadOwners){
        handleRequest('GET', ownerUrls[0])
            .then(result => {
                setOwners(result.sort(sortByLastName));
                setLoadOwners(false);
                setNewOwner({});
            });
        }
    }, [loadOwners])

    useEffect(()=> {
        if (editedOwnerId){
            handleRequest('GET', ownerUrls[1] + editedOwnerId)
            .then(result => {
                let reloadedOwners = [...owners.filter(o => o.id != editedOwnerId)];
                reloadedOwners.push(result);
                setOwners(reloadedOwners.sort(sortByLastName));
                setEditedOwnerId(null);
            });
        }
    }, [editedOwnerId])

    function handleSave() {
        handleRequest('POST', ownerUrls[0], () => {
            setNewDialogOpen(false); 
            setLoadOwners(true);
        }, newOwner)
    }

    function handleDialogClose() {
        setNewOwner({});
        setNewDialogOpen(false);
    }

    function getDialogContent() {
        return <EditOwnerInfo owner={newOwner} setOwner={setNewOwner} setLoadOwners={setLoadOwners}/>;
    }

    let ownerInfos = owners.map(owner => <OwnerInfo setEditedOwnerId={setEditedOwnerId} owner={owner} setLoadOwners={setLoadOwners}/>);
    ownerInfos.push(<NewButton onClick= {() => {setNewDialogOpen(true)}}/>)
    return (
        <div className='section'>
            {isVisible && ownerInfos}
            {<EditDialog title = 'Add Owner' open={newDialogOpen} loadContent={getDialogContent} handleClose={handleDialogClose} handleSave={handleSave}/>}
        </div>)
}