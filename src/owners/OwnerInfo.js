import { EditDialog } from '../Dialog';
import { useState, useEffect } from 'react';
import { handleRequest } from '../request';
import { ownerUrls } from '../constants';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import EditOwnerInfo from '../owners/EditOwnerInfo';

export default function OwnerInfo({owner, setEditedOwnerId, setLoadOwners}){
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [ownerInfo, setOwnerInfo]= useState({...owner});

    useEffect(()=> {
        setOwnerInfo({...owner});
    }, [owner])

    function handleSave(){
        const object = [{
            op: "replace",
            value: ownerInfo.firstName,
            path: "/firstName"
        },
        {
            op: "replace",
            value: ownerInfo.lastName,
            path: "/lastName"
        },
        {
            op: "replace",
            value: ownerInfo.phoneNumber,
            path: "/phoneNumber"
        },
        {
            op: "replace",
            value: ownerInfo.address,
            path: "/address"
        }
    ]

        handleRequest('PATCH', ownerUrls[1] + ownerInfo.id,() => {
            setEditDialogOpen(false);
            setEditedOwnerId(ownerInfo.id);
        }, object)
    }

    function PhoneNumber(){
        return (
            <div className='phoneSection'>
                <div className='phone'>
                    <CallIcon/> 
                    {owner.phoneNumber}
                </div>
            </div>
        )
    }

    function getDialogContent() {
        return <EditOwnerInfo owner={ownerInfo} setOwner={setOwnerInfo} setLoadOwners={setLoadOwners} setEditDialogOpen={setEditDialogOpen}/>;
    }

    return (
        <div className='vetInfoSection'> 
            <div className='vetFrame' onClick={() => setEditDialogOpen(true)}>
                <label>{owner.firstName.concat(' ', owner.lastName)}</label>
                <div className='lineVet'/>
                <div className='details'>
                    <div className='address'>
                        <HomeIcon/>
                        {owner.address}
                    </div>
                    <PhoneNumber/>
                </div>
            </div>
            <EditDialog title={owner.firstName.concat(' ', owner.lastName)} loadContent={getDialogContent} open={editDialogOpen} handleClose={()=> setEditDialogOpen(false)} handleSave={handleSave}/>
        </div>
    )
}