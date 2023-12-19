import { handleValueChanged } from '../common.js';
import { TextField } from "@mui/material";
import { handleRequest } from '../request.js';
import { vetUrls } from '../constants.js';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

export default function EditVetInfo({vet, setVet, setLoadVets, setEditDialogOpen}){    
    function handleDelete(){
        handleRequest('DELETE', vetUrls[1] + vet.id, 
        () => { 
            setLoadVets(true);
            setEditDialogOpen(false);
        },
        null);
    }

    return (
        <div className='editVetSection'>
            <div className='editVetInfo'>
                <TextField name ='firstName' label='First Name' variant="outlined" defaultValue = {vet.firstName} onChange={(e) => handleValueChanged(e, vet, setVet)}/>
                <TextField name ='lastName' label='Last Name' variant="outlined" defaultValue = {vet.lastName} onChange={(e) => handleValueChanged(e, vet, setVet)}/>
                <TextField name ='phoneNumber' label='Phone number' variant="outlined" defaultValue = {vet.phoneNumber} onChange={(e) => handleValueChanged(e, vet, setVet)}/>
                <TextField name ='mobilePhoneNumber' label='Mobile Phone number' variant="outlined" defaultValue = {vet.mobilePhoneNumber} onChange={(e) => handleValueChanged(e, vet, setVet)}/>
                <TextField name ='address' label='Address' variant="outlined" defaultValue = {vet.address} onChange={(e) => handleValueChanged(e, vet, setVet)}/>
            </div>
            <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>
        </div>
)}