import React from "react";
import { useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { postActivity} from '../../../redux/actions/postActivity';
import { postCity} from '../../../redux/actions/postCity';
import { postBus} from '../../../redux/actions/postBus';
import {postPackage} from '../../../redux/actions/postPackage';
import {postPlatform} from '../../../redux/actions/postPlattform';
import { postHotel} from '../../../redux/actions/postHotel';
function Ejemplo({lang}) {
  const dispatch = useDispatch();
  const [city, setCity]= React.useState({name:'',location:[]});
  const [bus, setBus]= React.useState({patent:'',seating:0});
  const [activity, setactivity]= React.useState({name:'',description:'',price:'',cityId:0});
  const [packages, setPackages]= React.useState({start_date:'',end_date:'',name:'', 
price:1, discount:1, 
stock: 1, plattformId: 0, 
busId: 0, cityId: 0, 
hotelId: 0, activity:[]});
const [platform, setPlatform]= React.useState({terminal:'',address:'',location:[]});
const [hotel, setHotel] = React.useState({
  name: "",
  location: [],
  phone: "",
  price: "",
  stars: 0,
  pool: true,
  wifi: true,
  gym: true,
  urlImage: [],
});

function TransformData(x){
  if(isNaN(x[0])) return x;
  return x.split(',')
  
  }
function handleChangeCity(event) {
 
  
    setCity( {...city, [event.target.name]:TransformData(event.target.value)});

}
   function handleSubmitCity(e) {
    e.preventDefault();// para que era esto?
  dispatch(postCity(city))
 
  }
  
  function handleChangeBus(event) {
 
  
    setBus( {...bus, [event.target.name]:event.target.value});
     
  }
  function handleSubmitBus(e) {
    e.preventDefault();
  dispatch(postBus(bus))
 
  }

  function handleChangeActivity(event) {
    setactivity( {...activity, [event.target.name]:event.target.value});
  }
     
      function handleSubmitActivity(e) {
      e.preventDefault();
    dispatch(postActivity(activity))}

    function TransformData2(x){
      return x.split(',')
      }
    
    
    function handleChange(event) {
        if(event.target.name === 'activity'){
            setPackages( {...packages, [event.target.name]:TransformData2(event.target.value)});
            return} 
        setPackages( {...packages, [event.target.name]:event.target.value});
    }
       
        function handleSubmit(e) {
        e.preventDefault();// para que era esto?
      dispatch(postPackage(packages))}

      function handleChangePlatform(event) {
        setPlatform( {...platform, [event.target.name]:TransformData(event.target.value)});
      }
         
          function handleSubmitPlatform(e) {
          e.preventDefault();// para que era esto?
        dispatch(postPlatform(platform))}

        function handleChangeHotel(event) {
          if (event.target.name === "location") {
            setHotel({
              ...hotel,
              [event.target.name]: TransformData(event.target.value),
            });
            return;
          }
          if (event.target.name === "urlImage") {
            setHotel({ ...hotel, [event.target.name]: [event.target.value] });
            return;
          }
          if (event.target.name === "gym" || event.target.name === "pool" || event.target.name === "wifi") {
            if (event.target.value === 'true'){
              setHotel({ ...hotel, [event.target.name]: true });
            } else {
              setHotel({ ...hotel, [event.target.name]: false });
            }
      
            return;
          }
      
          setHotel({ ...hotel, [event.target.name]: event.target.value });
        }
      
        function handleSubmitHotel(e) {
          e.preventDefault(); // para que era esto?
          dispatch(postHotel(hotel));
        }



  
  if(lang===''){
return(
<div>
Waiting for the Data

</div>


)


  }


  if (lang === 'Hotel') {
    return (
      <form className='form' onSubmit={handleSubmitHotel}>
    
     
     <div className="div-form">  
    <label className="label-form"> Name:</label>
        <input type="text" name='name' value={hotel["name"]}
            onChange={handleChangeHotel} /> 
    </div>
    
    
    <div className="div-form">
    <label className="label-form"> Location</label>
   <input type="text" name='location' value={hotel["location"]}
            onChange={handleChangeHotel}/> 
    </div>
 
    <div className="div-form">  
    <label className="label-form"> stars:</label>
        <input type="stars" name='stars' value={hotel["stars"]}
            onChange={handleChangeHotel}/> 
    </div>
    
    <div className="div-form">
    <label className="label-form"> phone:</label>
   <input type="text" name='phone' value={hotel["phone"]}
            onChange={handleChangeHotel}/> 
    </div>

    <div className="div-form">
    <label className="label-form"> price:</label>
   <input type="text" name='price'  value={hotel["price"]}
            onChange={handleChangeHotel} /> 
    </div>

    <div className="div-form">
    <label className="label-form"> urlImage:</label>
   <input type="text" name='urlImage' value={hotel["urlImage"]}
            onChange={handleChangeHotel}/> 
    </div>
    <div className="div-form">
          <label className="label-form"> Gimnasio: </label>
          <select name="gym" onChange={handleChangeHotel}>
            <option value="true" selected>Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="div-form">
          <label className="label-form"> Pool: </label>
          <select name="pool" onChange={handleChangeHotel}>
            <option value="true" selected>Si</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="div-form">
          <label className="label-form"> Wifi: </label>
          <select name="wifi" onChange={handleChangeHotel}>
            <option value="true" selected>Si</option>
            <option value="false">No</option>
          </select>
        </div>

    <div className="div-form">
    <label className="label-form"> cityId:</label>
   <input type="number" name='cityId' value={hotel["cityId"]}
            onChange={handleChangeHotel}/> 
    </div>
    <button type ="submit" className="button-form"
    > Create Hotel</button>
    
        </form>
      )
  }
 if(lang === 'Plattform')


  return (
    <form className='form' onSubmit={handleSubmitPlatform}>
    
     
    <div className="div-form">  
   <label className="label-form"> Terminal:</label>
       <input type="text" name='terminal' value={platform['terminal']} 
    onChange={handleChangePlatform}/> 
   </div>
   
   
   <div className="div-form">
   <label className="label-form"> Adress</label>
  <input type="text" name='address' value={platform['address']} 
    onChange={handleChangePlatform}/> 
   </div>

   <div className="div-form">
   <label className="label-form"> Location:</label>
  <input type="text" name='location' value={platform['location']} 
    onChange={handleChangePlatform}/> 
   </div>

  
   <button type ="submit" className="button-form"
   > Create Plattform</button>
       </form>
    );
 if (lang === 'City')
 return(
  <div className="div">

<form className='form' onSubmit={handleSubmitCity}>


<div className="div-form">  
<label className="label-form"> Name:</label>
  <input type="text" name='name' value={city['name']} 
    onChange={handleChangeCity}/> 
</div>


<div className="div-form">
<label className="label-form"> Location:</label>
  <input type="text" name='location' value={city['location']} 
    onChange={handleChangeCity} /> 
</div>



<button type ="submit" className="button-form"> Create City</button>
  </form>
  </div>
)
if (lang === 'Bus')
return(
<form className='form' onSubmit={handleSubmitBus}>
    
     
<div className="div-form">  
<label className="label-form"> Patent:</label>
   <input type="text" name='patent' value={bus['patent']} 
    onChange={handleChangeBus}
/> 
</div>


<div className="div-form">
<label className="label-form"> Seating:</label>

   <input type="text" name='seating' value={bus['seating']} 
    onChange={handleChangeBus}
/> 
</div>



<button type ="submit" className="button-form"> Create Bus</button>

   </form>
)
if (lang ==='Activity')
return(
  <form className='form' onSubmit={handleSubmitActivity}>
    
     
  <div className="div-form">  
 <label className="label-form"> Name:</label>
     <input type="text" name='name' value={activity['name']} 
    onChange={handleChangeActivity}/> 
 </div>
 
 
 <div className="div-form">
 <label className="label-form"> description</label>
<input type="text" name='description' value={activity['description']} 
    onChange={handleChangeActivity}/> 
 </div>

 <div className="div-form">
 <label className="label-form"> price:</label>
<input type="text" name='price'  value={activity['price']} 
    onChange={handleChangeActivity}/> 
 </div>


 <div className="div-form">
 <label className="label-form"> cityId:</label>
<input type="number" name='cityId' /> 
 </div>
 <button type ="submit" className="button-form"  value={activity['cityId']} 
    onChange={handleChangeActivity}
 > Create Activity</button>
 
     </form> 

)
if (lang==='Package')
return (
  <div className="div">

<form className='form'onSubmit={handleSubmit}>


<div className="div-form">  
<label className="label-form"> name:</label>
  <input type="text" name='name' value={packages['name']} 
onChange={handleChange}/> 
</div>


<div className="div-form">
<label className="label-form"> start_date</label>
<input type="text" name='start_date' value={packages['start_date']} 
onChange={handleChange}/> 
</div>

<div className="div-form">
<label className="label-form"> end_date:</label>
<input type="text" name='end_date' value={packages['end_date']} 
onChange={handleChange}/> 
</div>

<div className="div-form">
<label className="label-form"> price:</label>
<input type="number" name='price' value={packages['price']} 
onChange={handleChange}/> 
</div>

<div className="div-form">
<label className="label-form"> discount:</label>
<input type="number" name='discount' value={packages['discount']} 
onChange={handleChange}/> 
</div>


<div className="div-form">
<label className="label-form"> stock:</label>
<input type="number" name='stock' value={packages['stock']} 
onChange={handleChange}/> 
</div>


<div className="div-form">
<label className="label-form"> plattformId:</label>
<input type="number" name='plattformId' value={packages['plattformId']} 
onChange={handleChange}/> 
</div>


<div className="div-form">
<label className="label-form"> busId:</label>
<input type="number" name='busId' value={packages['busId']} 
onChange={handleChange}/> 
</div>


<div className="div-form">
<label className="label-form"> cityId:</label>
<input type="number" name='cityId' value={packages['cityId']} 
onChange={handleChange}/> 
</div>


<div className="div-form">
<label className="label-form"> hotelId:</label>
<input type="number" name='hotelId' value={packages['hotelId']} 
onChange={handleChange}/> 
</div>

<div className="div-form">
<label className="label-form"> activity:</label>
<input type="text" name='activity' value={packages['activity']} 
onChange={handleChange}/> 
</div>

<button type ="submit" className="button-form"
> Put Platform</button>
<Link to ="/admin"> Volver</Link>
  </form>
  </div>
)


}



export const CreateForm = ()=>{
const models=['Hotel','Plattform','City','Bus','Activity','Package'];

const [lang, setLang] = React.useState('');
const[boton, setButton] =React.useState(false)
console.log(lang, boton)

function handleChange(event) {
 
  
  setLang( (event.target.value));
  setButton(models.includes(lang)?true:false)
}

    return (
        <div>
      <input value={lang}  onChange={handleChange}/>
    
    <button onClick={()=>{setButton(models.includes(lang)?true:false)}}>Go</button>
    {boton && models.includes(lang)?<Ejemplo lang={lang}/>: ''}

    <Link to ="/admin"> Volver</Link>

        </div>
)

}