import { useEffect, useState } from 'react';
import { handleRequest } from '../request.js';
import { EditDialog, NewMedVisitDialog } from '../Dialog.js';
import { getEditedMedVisitInfo } from './EditMedVisitsInfo.js'
import { medVisitTypes, medVisitIcons, catMedVisitsUrls, medVisitsUrls } from '../constants.js';
import LabeledCheckBox from '../LabeledCheckBox.js';
import MedicalVisit from './MedicalVisit.js';
import NewButton from "../NewButton.js";

export default function MedicalVisitsInfo({catName, catId}){
    const [scheduledMedVisits, setScheduledMedVisits]= useState([]);
    const [editedMedVisitInfo, setEditedMedVisitInfo] = useState(null);
    const [deletedMedVisit, setDeletedMedVisit] = useState(null);
    const [newMedVisitType, setNewMedVisitType] = useState(null);
    const [reloadMedVisits, setReloadMedVisits]= useState(false);
    const [showPending, setShowPending] = useState(true);
    const [showPast, setShowPast] = useState(false);
    const [showCanceled, setShowCanceled] = useState(false);
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    function sortMedVisits(prev, next) {
        if (prev.scheduledDate < next.scheduledDate){
            return -1;
        }
        else if (prev.scheduledDate > next.scheduledDate){
            return 1;
        }
        else if (prev.id > next.id) {
            return 1;
        }
        else if (prev.id < next.id) {
            return 1;
        }
        else {
            return 0;
        }
    }

    useEffect(()=> {
        let requests = catMedVisitsUrls.map(url => handleRequest('GET', url.concat(catId)));
        let medVisits = [];
        Promise.allSettled(requests).then(results => {
            results.forEach(result => {
                if (result.status == 'fulfilled'){
                    medVisits = medVisits.concat(result.value);
                }
                else {
                    //if not loaded
                }
            });
            setScheduledMedVisits(medVisits.sort(sortMedVisits));
        })
    }, []);

    function getPatchObject(type) {
        switch (type){
            case 0: return [{
                op: "replace",
                value: editedMedVisitInfo.medicine,
                path: "/medicine"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.parasitesType,
                path: "/parasitesType"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            }]
            case 1: return [{
                op: "replace",
                value: editedMedVisitInfo.number,
                path: "/number"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.position,
                path: "/position"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isMunicipalityDeclared,
                path: "/isMunicipalityDeclared"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            }]
            case 2: return [{
                op: "replace",
                value: editedMedVisitInfo.reason,
                path: "/reason"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.bloodResultsDate,
                path: "/bloodResultsDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isNegative,
                path: "/isNegative"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            }
            ]
            case 3: return [{
                op: "replace",
                value: editedMedVisitInfo.vaccineName,
                path: "/vaccineName"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.vaccineManufacturer,
                path: "/vaccineManufacturer"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.disease,
                path: "/disease"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.catWeight,
                path: "/catWeight"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            }
            ]
            case 4: return [{
                op: "replace",
                value: editedMedVisitInfo.medicationInstructions,
                path: "/medicationInstructions"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.stitchesRemovalDate,
                path: "/stitchesRemovalDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            }
            ]
            case 5: return [{
                op: "replace",
                value: editedMedVisitInfo.purpose,
                path: "/purpose"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.medicationInstructions,
                path: "/medicationInstructions"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            }
            ]
            case 5:
            default: return [{
                op: "replace",
                value: editedMedVisitInfo.notes,
                path: "/notes"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.scheduledDate,
                path: "/scheduledDate"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.cost,
                path: "/cost"
            },
            {
                op: "replace",
                value: editedMedVisitInfo.isCanceled,
                path: "/isCanceled"
            }
            ]
        }
    }

    function saveMedVisit(){
        let patchObject = getPatchObject(editedMedVisitInfo.type);
        handleRequest('PATCH',
            medVisitsUrls[editedMedVisitInfo.type].concat(editedMedVisitInfo.id),
            () => {setReloadMedVisits(true)},
            patchObject);
    }

    useEffect(()=> {
        if (reloadMedVisits || newMedVisitType != null){
            let medVisits = [...scheduledMedVisits];
            if (editedMedVisitInfo && deletedMedVisit){
                handleRequest('GET', catMedVisitsUrls[deletedMedVisit.type].concat(catId))
                .then(result => {
                    medVisits = medVisits.filter(v => !result.some(item => item.id == v.id) && v.id != deletedMedVisit.id);
                    medVisits = medVisits.concat(result)
                    setScheduledMedVisits(medVisits.sort(sortMedVisits));
                });          
            }
            else if (editedMedVisitInfo){
                handleRequest('GET', medVisitsUrls[editedMedVisitInfo.type].concat(editedMedVisitInfo.id))
                .then(result => {
                    medVisits = medVisits.filter(v => v.id != editedMedVisitInfo.id);
                    medVisits.push(result);
                    setScheduledMedVisits(medVisits.sort(sortMedVisits));
                });
            }
            else {
                handleRequest('GET', catMedVisitsUrls[newMedVisitType].concat(catId))
                .then(result => {
                    medVisits = medVisits.filter(v => !result.some(item => item.id == v.id));
                    medVisits = medVisits.concat(result)
                    setScheduledMedVisits(medVisits.sort(sortMedVisits));
                });
            }
            setReloadMedVisits(false);
            setDeletedMedVisit(null);
            setEditedMedVisitInfo(null);
            setNewMedVisitType(null);
        }
    }, [reloadMedVisits, newMedVisitType])

    function filterMedVisits(){
        let displayedMedVisits = [];
        if (showPending){
            displayedMedVisits = displayedMedVisits.concat(scheduledMedVisits.filter(a => new Date(a.scheduledDate) > Date.now() && !a.isCanceled && (displayedMedVisits.map(x => x.id)).indexOf(a.id) <0));
        }
        if (showPast){
            displayedMedVisits = displayedMedVisits.concat(scheduledMedVisits.filter(a => new Date(a.scheduledDate) <= Date.now() && displayedMedVisits.indexOf(a) <0));
        }
        if (showCanceled){
            displayedMedVisits = displayedMedVisits.concat(scheduledMedVisits.filter(a => a.isCanceled && displayedMedVisits.indexOf(a) <0));
        }
    
        return displayedMedVisits.sort(sortMedVisits).map(a => <MedicalVisit key={a.id} type={a.type} canceled={a.isCanceled} scheduledDate={a.scheduledDate} handleClick={() => setEditedMedVisitInfo(a)}/>)
    }

    return (
        <div>
            <div className='catMedVisitsSection'>
                <div className = 'filters'>
                  <LabeledCheckBox className='pendingFilter' caption='Pending' checked={showPending} onChange={() => {setShowPending(!showPending)}} />
                  <LabeledCheckBox className='canceledFilter' caption='Canceled' checked={showCanceled} onChange={() => {setShowCanceled(!showCanceled)}} />
                  <LabeledCheckBox className='pastFilter' caption='Past' checked={showPast} onChange={() => {setShowPast(!showPast)}} />
                </div>
                <div className='medVisitsSection'>
                    <label>{catName.concat("'s Medical Visits")}</label>
                    <div className ='medVisits'>
                        {filterMedVisits()}
                        <NewButton onClick= {() => {setNewDialogOpen(true)}}/>
                    </div>
                    <NewMedVisitDialog catId = {catId} open={newDialogOpen} setNewMedVisitType = {setNewMedVisitType} handleClose={() => {setNewDialogOpen(false)}}/>
                </div>
            </div>
            {editedMedVisitInfo && <EditDialog title={medVisitTypes[editedMedVisitInfo.type]} loadContent={() => getEditedMedVisitInfo(editedMedVisitInfo, setEditedMedVisitInfo, setReloadMedVisits, setDeletedMedVisit)} src={medVisitIcons[editedMedVisitInfo.type]} selected={editedMedVisitInfo} open={editedMedVisitInfo != null} handleClose={() => setEditedMedVisitInfo(null)} handleSave={saveMedVisit}/>}
        </div>)
    }