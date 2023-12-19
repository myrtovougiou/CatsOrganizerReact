import { useState, useReducer, useRef } from "react";
import { customReducer } from './customReducer.js';
import { CatMenuButton, MedVisitMenuButton, VetMenuButton, OwnerMenuButton } from "./MenuButton.js";
import { VetsSection } from "./vets/VetsSection.js";
import { OwnersSection } from "./owners/OwnersSection.js";
import CatsSection from './cats/CatsSection.js'
import MedicalVisitsInfo from "./medicalVisits/MedicalVisitsInfo.js"; 

export default function App(){
    const [cats, dispatchCats] = useReducer(customReducer, []);
    const [showCats, setShowCats] = useState(true);
    const [showVets, setShowVets] = useState(false);
    const [showOwners, setShowOwners] = useState(false);
    const [showMedVisits, setShowMedVisits] = useState(false);
    const catButtonRef = useRef(null);
    const vetButtonRef = useRef(null);
    const ownerButtonRef = useRef(null);
    const medVisitButtonRef = useRef(null);

    function handleMenuButtonClick(type){
        switch(type){
            case 'vets':
                setShowCats(false);
                setShowVets(true);
                setShowOwners(false);
                setShowMedVisits(false);
                ownerButtonRef.current.className='menuButton';
                catButtonRef.current.className='menuButton';
                vetButtonRef.current.className='menuButton selected';
                medVisitButtonRef.current.className='menuButton';
                break;
                case 'owners':
                    setShowCats(false);
                    setShowVets(false);
                    setShowOwners(true);
                    setShowMedVisits(false);
                    ownerButtonRef.current.className='menuButton selected';
                    catButtonRef.current.className='menuButton';
                    vetButtonRef.current.className='menuButton';
                    medVisitButtonRef.current.className='menuButton';
                    break;
            case 'medVisits':
                setShowCats(false);
                setShowVets(false);
                setShowOwners(false);
                setShowMedVisits(true);
                ownerButtonRef.current.className='menuButton';
                catButtonRef.current.className='menuButton';
                vetButtonRef.current.className='menuButton';
                medVisitButtonRef.current.className='menuButton selected';
                break;
            case 'cats':
            default:
                setShowCats(true);
                setShowVets(false);
                setShowOwners(false);
                setShowMedVisits(false);
                ownerButtonRef.current.className='menuButton';
                catButtonRef.current.className='menuButton selected';
                vetButtonRef.current.className='menuButton';
                medVisitButtonRef.current.className='menuButton';
                break;
        }
    }

    return (
        <div id='appPage'>
            <div id='toolbar'>
                <label>Cats Organizer</label>
            </div>
            <div className='menuButtons'>
                <CatMenuButton onClick={() => handleMenuButtonClick('cats')} ref = {catButtonRef}/>
                <VetMenuButton onClick={() => handleMenuButtonClick('vets')} ref = {vetButtonRef}/>
                <OwnerMenuButton onClick={() => handleMenuButtonClick('owners')} ref = {ownerButtonRef}/>
                <MedVisitMenuButton onClick={() => handleMenuButtonClick('medVisits')} ref = {medVisitButtonRef}/>
            </div>
            <CatsSection isVisible = {showCats} cats={cats} dispatchCats = {dispatchCats}/>
            <VetsSection isVisible = {showVets}/>
            <OwnersSection isVisible = {showOwners}/>
            {showMedVisits && cats.map(cat => <MedicalVisitsInfo key={cat.id} catName={cat.name} catId = {cat.id}/>)}
        </div>) 
}

