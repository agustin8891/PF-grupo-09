import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterByDestiny } from '../../../redux/actions/filterByDestiny';
import { sortByPrice } from '../../../redux/actions/sortByPrice';
import { sortByStock } from '../../../redux/actions/sortByStock';

function Filters(props) {

    const {cities} = useSelector(state => state);
    const dispatch = useDispatch();

    function handleCities(e){
        dispatch(filterByDestiny(e.target.value, props.price, props.stock))
        props.setCity(e.target.value)
        props.setCurrentPage(1)
    }
    function handleSortByPrice(e){
        let startShortDate = ''
        let endShortDate = ''
        if(props.startDate !== ''){
            return startShortDate = props.startDate?.toISOString().substring(0,10)
        }
        if(props.endDate !== ''){
            return endShortDate = props.endDate?.toISOString().substring(0,10)
        }
        dispatch(sortByPrice(e.target.value, props.city, startShortDate , endShortDate))
        props.setPrice(e.target.value)
        props.setCurrentPage(1)
    }
    function handleSortByStock(e){
        let startShortDate = ''
        let endShortDate = ''
        if(props.startDate !== ''){
            return startShortDate = props.startDate?.toISOString().substring(0,10)
        }
        if(props.endDate !== ''){
            return endShortDate = props.endDate?.toISOString().substring(0,10)
        }
        dispatch(sortByStock(e.target.value, props.city, startShortDate, endShortDate))
        props.setStock(e.target.value)
        props.setCurrentPage(1)
    }


  return (
    <div>
        <select defaultValue="" onChange={handleSortByPrice}>
            <option value="" disabled>Ordenar</option>
            <option label={'Menor precio'} value="asc">Ascending</option>
            <option label={'Mayor precio'} value="desc">Descending</option>
        </select>
        <select defaultValue="" onChange={handleSortByStock}>
            <option value="" disabled>Sort by stock</option>
            <option label={'Menor stock'} value="asc">Ascending</option>
            <option label={'Mayor stock'} value="desc">Descending</option>
        </select>
        <select defaultValue="" onChange={handleCities}>
            <option value="" disabled>Filter by destination city</option>
            <option value="">Show all</option>
            {cities.map((e, index) => (
                <option key={index}>{e.name}</option>
            ))}
        </select>
    </div>
  )
}

export default Filters