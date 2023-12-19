import IconButton from '@mui/material/IconButton';
import AddRounded from '@mui/icons-material/AddRounded';

export default function NewButton({onClick}){
    return <IconButton>
        <AddRounded fontSize='50px' onClick= {onClick}/>
    </IconButton>;
}