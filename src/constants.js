export const medVisitIcons = {
    0:'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/754257d9-97c5-4e96-a9e8-63153d497f96/Advocate-comprehensive-intestinal-worm-protection-icon.svg?w=640&q=75&auto=format',
    1:'https://cdn2.iconfinder.com/data/icons/pet-26/100/cat-microchip-gps-pet-smart-devices-animal-cat-chip-tracker-microchip-gps-512.png',
    2:'https://cdn-icons-png.flaticon.com/512/4706/4706859.png',
    3:'https://kindanimalcarefl.com/wp-content/uploads/2020/08/iconfinder_syringe-vet-pet_5413413.png',
    4:'https://cdn3.iconfinder.com/data/icons/pet-care-1/2000/sterilization-01-1024.png',
    5:'https://cdn2.iconfinder.com/data/icons/pet-26/100/cat-visit-vet-pet-care-animal-cat-surgery-recovery-cone-of-shame-buster-e-collar-512.png',
    6:'https://cdn4.iconfinder.com/data/icons/veterinary-7/64/appointment-vet-pet-512.png'
}

export const medVisitTypes = [
    'Parasites Treatment',
    'Microchip',
    'Blood Test',
    'Vaccination',
    'Sterilization',
    'Surgery',
    'Other Appointment'
]

const baseUrl = 'https://localhost:7012/api/';
export const medVisitsUrls = {
    0: baseUrl + 'parasiteTreatment/',
    1: baseUrl + 'microchip/',
    2: baseUrl + 'bloodTest/',
    3: baseUrl + 'vaccination/',
    4: baseUrl + 'sterilization/',
    5: baseUrl + 'surgery/',
    6: baseUrl + 'appointment/',
}

export const catMedVisitsUrls = [
    baseUrl + 'parasiteTreatment/cat/',
    baseUrl + 'microchip/cat/',
    baseUrl + 'bloodTest/cat/',
    baseUrl + 'vaccination/cat/',
    baseUrl + 'sterilization/cat/',
    baseUrl + 'surgery/cat/',
    baseUrl + 'appointment/cat/',
]

export const catUrls = {
    0: 'https://localhost:7012/api/cat',
    1: 'https://localhost:7012/api/cat/',
}

export const vetUrls = {
    0: 'https://localhost:7012/api/vet',
    1: 'https://localhost:7012/api/vet/',
}

export const ownerUrls = {
    0: 'https://localhost:7012/api/owner',
    1: 'https://localhost:7012/api/owner/'
}

export const sexes = ['Male', 'Female'];
export const parasites = ['Endoparasites', 'Exoparasites', 'Endo & Exoparasites'];
export const bloodResults = ['Negative', 'Positive'];
export const chipPositions = ['Neck Right', 'Neck Left'];

export const ownerIcon = 'https://cdn4.iconfinder.com/data/icons/family-member/100/family_color-21-512.png'

export const dateFormats = ['D MMM, YYYY h:m a', 'D MMM, YYYY']

export const imagePrefix = 'data:image/jpg;base64,';
