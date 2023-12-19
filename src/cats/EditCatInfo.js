import { handleValueChanged, getMenuItemStyle} from '../common.js';
import { Avatar, TextField, MenuItem } from "@mui/material";
import { dateFormats, catUrls, vetUrls, ownerUrls, sexes, imagePrefix } from '../constants.js';
import { handleRequest } from '../request.js';
import { useEffect, useState } from 'react';
import DatePicker from '../DatePicker.js';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';

export default function EditCatInfo({cat, setCat, setLoadCats, setEditDialogOpen}){
    const [vets, setVets] = useState([]);
    const [owners, setOwners] = useState([]);
    
    function getSelectedDate(x){
        setCat({
            ...cat, birthDate:x
        })
    }

    function handleDelete(){
        handleRequest('DELETE', catUrls[1] + cat.id, 
        () => { 
            setLoadCats(true);
            setEditDialogOpen(false);
        },
         null);
    }

    useEffect(()=> {
        handleRequest('GET', vetUrls[0])
            .then(result => {setVets(result)});
        
        handleRequest('GET', ownerUrls[0])
            .then(result => {setOwners(result)});
    },[])

    let sexMenuItems = sexes.map((sex,i) => <MenuItem sx = {getMenuItemStyle()} value={i}>{sex}</MenuItem>);
    let vetMenuItems = vets.map(vet => <MenuItem sx = {getMenuItemStyle()} value={vet.id}>{vet.firstName.concat(' ', vet.lastName)}</MenuItem>);
    let ownerMenuItems = owners.map(owner => <MenuItem sx = {getMenuItemStyle()} value={owner.id}>{owner.firstName.concat(' ', owner.lastName)}</MenuItem>);
    
    return (
        <div>
            <div className='editCatSection'>
                <div className='editCatInfo'>
                    <TextField name ='name' label="Name" variant="outlined" defaultValue = {cat.name} onChange={(e) => handleValueChanged(e, cat, setCat)}/>
                    <TextField name ='sex' select className='select' label="Sex" value={cat.sex} onChange={(e) => handleValueChanged(e, cat, setCat)}>
                        {sexMenuItems}
                    </TextField>
                    <TextField name ='breed' label='Breed' variant='outlined' defaultValue = {cat.breed} onChange={(e) => handleValueChanged(e, cat, setCat)}/>
                    <TextField name ='color' label='Color' variant='outlined' defaultValue = {cat.color} onChange={(e) => handleValueChanged(e, cat, setCat)}/>
                    <DatePicker format = {dateFormats[1]} name ='birthDate' caption ='BirthDate' day={cat.birthDate} setScheduledDate={getSelectedDate}/>
                </div>
                <PictureSection cat={cat} setCat={setCat}/>
            </div>
        <div className='deleteSectionCat'>
            <div className='editCatInfoLarge'>
                <TextField name ='ownerId' select className='select' label="Owner" value={cat.ownerId} onChange={(e) => handleValueChanged(e, cat, setCat)}>
                    {ownerMenuItems}
                </TextField>
                <TextField name='vetId' select className='select' label="Vet" value={cat.vetId} onChange={(e) => handleValueChanged(e, cat, setCat)}>
                    {vetMenuItems}
                </TextField>
            </div>
            <div className='deleteButton'>
                <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>
            </div>
        </div>
    </div>
)
}

function PictureSection({cat, setCat}) {
    const [file, setFile] = useState(null);

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        convertBase64(e.target.files[0])
            .then(result => {
                setCat({...cat, picture: result});
            });
    }

    function convertBase64(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }

    function getAvatarStyle(){
        return {height:150, width:150, marginTop:'30px'};
    }

    let imageSrc = '';
    if (file){
        imageSrc = file
    }
    else if (cat.picture && cat.picture.includes(imagePrefix)){
        imageSrc = cat.picture
    }
    else if (cat.picture) {
        imageSrc = imagePrefix.concat(cat.picture.toString('base64'));
    }

    return (
        <div className='updateSection'>
            <input type='file' accept='image/*' style={{ display: 'none' }} onChange={handleChange} id='uploadButton' />
            <Avatar sx={getAvatarStyle()} alt={cat.name} src={imageSrc}/>
            <label htmlFor='uploadButton'>
                <IconButton component='span'>
                    <UploadFileIcon />
                </IconButton>
            </label>
        </div>
    )
}