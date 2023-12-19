import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import TodayIcon from '@mui/icons-material/Today';
import FaceIcon from '@mui/icons-material/Face';

const MenuButton = forwardRef((props, ref) => {
    const {icon, text, onClick} = props;

    let menuButtonClass = text == 'cats' ? 'menuButton selected': 'menuButton';
    return (
        <Button style={{textTransform: 'none'}} >
            <div className={menuButtonClass} ref={ref} onClick={onClick}>
                {icon}
                {text}
            </div>
        </Button>
    )
})

export const CatMenuButton = forwardRef((props, ref) => {
    const {onClick} = props;

    return (
        <MenuButton text = 'cats' icon ={<PetsIcon sx = {getIconSize()}/>} onClick={onClick} ref = {ref}/>
    )
})

export const VetMenuButton = forwardRef((props, ref) => {
    const {onClick} = props;

    return (
        <MenuButton text = 'vets' icon ={<VaccinesIcon sx = {getIconSize()}/>} onClick={onClick} ref = {ref}/>
    )
})

export const MedVisitMenuButton = forwardRef((props, ref) => {
    const {onClick} = props;

    return (
        <MenuButton text = 'medical visits' icon ={<TodayIcon sx = {getIconSize()}/>} onClick={onClick} ref = {ref}/>
    )
})

export const OwnerMenuButton = forwardRef((props, ref) => {
    const {onClick} = props;

    return (
        <MenuButton text = 'owners' icon ={<FaceIcon sx = {getIconSize()}/>} onClick={onClick} ref = {ref}/>
    )
})

function getIconSize() {
    return {width:22, height:22};
}