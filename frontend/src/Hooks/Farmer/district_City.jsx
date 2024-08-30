import { useState } from 'react'

export const useDistricts = () => {
    const [districts] = useState([
        {
            name: 'Colombo',
            cities: [
                'Colombo',
                'Dehiwala-Mount Lavinia',
                'Moratuwa',
                'Maharagama',
                'Kesbewa',
            ],
        },
        {
            name: 'Gampaha',
            cities: ['Gampaha', 'Negombo', 'Wattala', 'Ja-Ela', 'Minuwangoda'],
        },
        {
            name: 'Kalutara',
            cities: ['Kalutara', 'Panadura', 'Beruwala', 'Aluthgama', 'Horana'],
        },
        {
            name: 'Kandy',
            cities: [
                'Kandy',
                'Peradeniya',
                'Gampola',
                'Nawalapitiya',
                'Kadugannawa',
            ],
        },
        {
            name: 'Matale',
            cities: ['Matale', 'Dambulla', 'Sigiriya', 'Pallepola', 'Galewela'],
        },
        {
            name: 'Nuwara Eliya',
            cities: [
                'Nuwara Eliya',
                'Hatton',
                'Talawakelle',
                'Bandarawela',
                'Nanu Oya',
            ],
        },
        {
            name: 'Galle',
            cities: [
                'Galle',
                'Hikkaduwa',
                'Ambalangoda',
                'Elpitiya',
                'Karapitiya',
            ],
        },
        {
            name: 'Matara',
            cities: [
                'Matara',
                'Weligama',
                'Dikwella',
                'Kamburupitiya',
                'Akuressa',
            ],
        },
        {
            name: 'Hambantota',
            cities: [
                'Hambantota',
                'Tangalle',
                'Tissamaharama',
                'Kataragama',
                'Ambalantota',
            ],
        },
        {
            name: 'Jaffna',
            cities: [
                'Jaffna',
                'Chavakachcheri',
                'Nallur',
                'Point Pedro',
                'Kilinochchi',
            ],
        },
        {
            name: 'Kilinochchi',
            cities: [
                'Kilinochchi',
                'Paranthan',
                'Murikandy',
                'Pallai',
                'Elephant Pass',
            ],
        },
        {
            name: 'Mannar',
            cities: [
                'Mannar',
                'Thalaimannar',
                'Pesalai',
                'Murunkan',
                'Vidathaltheevu',
            ],
        },
        {
            name: 'Vavuniya',
            cities: [
                'Vavuniya',
                'Cheddikulam',
                'Venkalacheddikulam',
                'Omanthai',
                'Nedunkeni',
            ],
        },
        {
            name: 'Mullaitivu',
            cities: [
                'Mullaitivu',
                'Puthukudiyiruppu',
                'Oddusuddan',
                'Thunukkai',
                'Kokkilai',
            ],
        },
        {
            name: 'Batticaloa',
            cities: [
                'Batticaloa',
                'Kaluwanchikudy',
                'Eravur',
                'Kattankudy',
                'Valachchenai',
            ],
        },
        {
            name: 'Ampara',
            cities: [
                'Ampara',
                'Kalmunai',
                'Sammanthurai',
                'Akkaraipattu',
                'Pottuvil',
            ],
        },
        {
            name: 'Trincomalee',
            cities: ['Trincomalee', 'Kinniya', 'Kantale', 'Muttur', 'Nilaveli'],
        },
        {
            name: 'Kurunegala',
            cities: [
                'Kurunegala',
                'Kuliyapitiya',
                'Pannala',
                'Narammala',
                'Polgahawela',
            ],
        },
        {
            name: 'Puttalam',
            cities: [
                'Puttalam',
                'Chilaw',
                'Anamaduwa',
                'Wennappuwa',
                'Naththandiya',
            ],
        },
        {
            name: 'Anuradhapura',
            cities: [
                'Anuradhapura',
                'Mihintale',
                'Kekirawa',
                'Medawachchiya',
                'Nochchiyagama',
            ],
        },
        {
            name: 'Polonnaruwa',
            cities: [
                'Polonnaruwa',
                'Kaduruwela',
                'Hingurakgoda',
                'Medirigiriya',
                'Manampitiya',
            ],
        },
        {
            name: 'Badulla',
            cities: ['Badulla', 'Bandarawela', 'Haputale', 'Ella', 'Passara'],
        },
        {
            name: 'Monaragala',
            cities: [
                'Monaragala',
                'Wellawaya',
                'Bibile',
                'Kataragama',
                'Buttala',
            ],
        },
        {
            name: 'Ratnapura',
            cities: [
                'Ratnapura',
                'Balangoda',
                'Eheliyagoda',
                'Pelmadulla',
                'Embilipitiya',
            ],
        },
        {
            name: 'Kegalle',
            cities: [
                'Kegalle',
                'Mawanella',
                'Warakapola',
                'Ruwanwella',
                'Rambukkana',
            ],
        },
    ])
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState('')

    const handleDistrictChange = (e) => {
        const selectedDistrictName = e.target.value
        setSelectedDistrict(selectedDistrictName)

        const district = districts.find((d) => d.name === selectedDistrictName)
        setCities(district ? district.cities : [])
        setSelectedCity('') // Reset city selection when district changes
    }

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
    }

    return {
        districts,
        cities,
        handleDistrictChange,
        handleCityChange,
    }
}
