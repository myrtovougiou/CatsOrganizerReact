import { EditDialog } from '../Dialog';
import { useState, useEffect } from 'react';
import { handleRequest } from '../request';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EditVetInfo from '../vets/EditVetInfo';

export default function VetInfo({vet, setEditedVetId, setLoadVets}){
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [vetInfo, setVetInfo]= useState({...vet});

    useEffect(()=> {
        setVetInfo({...vet});
    }, [vet])

    function handleSave(){
        const object = [{
            op: "replace",
            value: vetInfo.firstName,
            path: "/firstName"
        },
        {
            op: "replace",
            value: vetInfo.lastName,
            path: "/lastName"
        },
        {
            op: "replace",
            value: vetInfo.phoneNumber,
            path: "/phoneNumber"
        },
        {
            op: "replace",
            value: vetInfo.mobilePhoneNumber,
            path: "/mobilePhoneNumber"
        },
        {
            op: "replace",
            value: vetInfo.address,
            path: "/address"
        }
    ]

        handleRequest('PATCH', 'https://localhost:7012/api/vet/'+ vetInfo.id,() => {
            setEditDialogOpen(false);
            setEditedVetId(vetInfo.id);
        }, object)
    }

    function PhoneNumber(){
        return (
            <div className='phoneSection'>
                <div className='phone'>
                    <CallIcon/> 
                    {vet.phoneNumber}
                </div>
                <div className='mobile'>
                    <PhoneAndroidIcon/>
                    {vet.mobilePhoneNumber}
                </div>
            </div>
        )
    }

    function getDialogContent() {
        return <EditVetInfo vet={vetInfo} setVet = {setVetInfo} setLoadVets={setLoadVets} setEditDialogOpen={setEditDialogOpen}/>;
    }

    return (
        <div className='vetInfoSection'> 
            <div className='vetFrame' onClick={() => setEditDialogOpen(true)}>
                <label>{vet.firstName.concat(' ', vet.lastName)}</label>
                <div className='lineVet'/>
                <div className='details'>
                    <div className='address'>
                        <HomeIcon/>
                        {vet.address}
                    </div>
                    <PhoneNumber/>
                </div>
            </div>
            <EditDialog title={vet.firstName.concat(' ',vet.lastName)} loadContent={getDialogContent} open={editDialogOpen} handleClose={()=> setEditDialogOpen(false)} handleSave={handleSave}/>
        </div>
    )
}