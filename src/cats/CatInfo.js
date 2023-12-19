import { useState, useEffect } from 'react';
import { Avatar } from "@mui/material";
import { ownerIcon, sexes, catUrls, imagePrefix } from '../constants.js';
import { EditDialog } from '../Dialog.js';
import { handleRequest } from '../request.js';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditCatInfo from './EditCatInfo.js';

export default function CatInfo({cat, setEditedCatId, setLoadCats}){
    const [avatarClass, setAvatarClass]= useState('avatar');
    const [catFrameClass, setCatFrameClass]= useState('catFrame');
    const [editDialogOpen, setEditDialogOpen]= useState(false);
    const [catInfo, setCatInfo]= useState({...cat});

    useEffect(()=> {
        setCatInfo({...cat});
    }, [cat])

    function handleSave(){
        const object = [{
            op: "replace",
            value: catInfo.name,
            path: "/name"
        },
        {
            op: "replace",
            value: catInfo.birthDate,
            path: "/birthDate"
        },
        {
            op: "replace",
            value: catInfo.sex,
            path: "/sex"
        },
        {
            op: "replace",
            value: catInfo.breed,
            path: "/breed"
        },
        {
            op: "replace",
            value: catInfo.color,
            path: "/color"
        },
        {
            op: "replace",
            value: catInfo.ownerId,
            path: "/ownerId"
        },
        {
            op: "replace",
            value: catInfo.vetId,
            path: "/vetId"
        },
        {
            op: "replace",
            value: catInfo.picture.includes('base64') ? catInfo.picture : imagePrefix.concat(catInfo.picture.toString('base64')),
            path: "/picture"
        },
    ]

        handleRequest('PATCH', catUrls[1] + catInfo.id,() => {
            setEditDialogOpen(false);
            setEditedCatId(catInfo.id);
        }, object)
    }

    function handleMouseOver(){
        setAvatarClass('avatarHover');
        setCatFrameClass('catFrameHover');
    }

    function handleMouseOut(){
        setAvatarClass('avatar');
        setCatFrameClass('catFrame')
    }

    function BirthDay(){
        let now = new Date(Date.now());
        let birthDate = new Date(cat.birthDate);
        let birthDay = birthDate.toString().slice(4,15);
        let ageYears = (now.getFullYear() - birthDate.getFullYear()).toString();
        let caption = ageYears.concat(' years');
        if (ageYears == '0') {
            let ageMonths = (Math.abs(now.getMonth() - birthDate.getMonth())).toString();
            caption = ageMonths.concat(' months');
        }

        return (
            <div className='ageSection'>
                <div className='birthDay'>
                    <CakeIcon/> 
                    {birthDay}
                </div>
                <div className='age'>
                    <FavoriteIcon/>
                    {caption}
                </div>
            </div>
        )
    }

    function Sex(){
        return (
            cat.sex == 0 
                ? <div className='male'><MaleIcon/> {sexes[cat.sex]}</div> 
                : <div className='female'><FemaleIcon/> {sexes[cat.sex]}</div>
        )
    }

    function getAvatarSize(){
        return {height:130, width:130};
    }

    function getDialogContent() {
        return <EditCatInfo cat={catInfo} setCat={setCatInfo} setLoadCats={setLoadCats} setEditDialogOpen={setEditDialogOpen}/>;
    }

    function handleDialogClose(){
        setEditDialogOpen(false); 
        setCatInfo({...cat})
    }

    let imageSrc = cat.picture != null ? imagePrefix.concat(cat.picture.toString('base64')) : '';

    return (
        <div className='catInfoSection'> 
            <Avatar alt={cat.name} src={imageSrc} className={avatarClass} sx={getAvatarSize()} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={() => setEditDialogOpen(true)}/>
            <div className={catFrameClass} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={() => setEditDialogOpen(true)}>
                <label>{cat.name}</label>
                <div className='line'/>
                <div className='details'>
                    <Sex/>
                    <div className='owner'>
                        <img src={ownerIcon}/>
                        {cat.owner && cat.owner.firstName.concat(' ', cat.owner.lastName)}
                    </div>
                    <BirthDay/>
                </div>
            </div>
            <EditDialog title={cat.name} open={editDialogOpen} loadContent={getDialogContent} handleClose={handleDialogClose} handleSave={handleSave}/>
        </div>
    )
}