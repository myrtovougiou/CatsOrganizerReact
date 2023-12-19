import { TextField } from "@mui/material";
import { handleRequest } from '../request.js';
import { handleValueChanged } from "../common.js";
import { ownerUrls } from "../constants.js";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

export default function EditOwnerInfo({owner, setOwner, setLoadOwners, setEditDialogOpen}){
    function handleDelete(){
        handleRequest('DELETE', ownerUrls[1] + owner.id, 
        () => { 
            setLoadOwners(true);
            setEditDialogOpen(false);
        },
        null);
    }

    return (
        <div className="editOwnerSection">
            <div className='editOwnerInfo'>
                <TextField name ='firstName' label="First Name" variant="outlined" defaultValue = {owner.firstName} onChange={(e) => handleValueChanged(e, owner, setOwner)}/>
                <TextField name ='lastName' label="Last Name" variant="outlined" defaultValue = {owner.lastName} onChange={(e) => handleValueChanged(e, owner, setOwner)}/>
                <TextField name ='phoneNumber' label="Phone number" variant="outlined" defaultValue = {owner.phoneNumber} onChange={(e) => handleValueChanged(e, owner, setOwner)}/>
                <TextField name ='address' label="Address" variant="outlined" defaultValue = {owner.address} onChange={(e) => handleValueChanged(e, owner, setOwner)}/>
            </div>
            <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>
        </div>
)}