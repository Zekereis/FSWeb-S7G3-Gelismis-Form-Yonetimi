import React,{useState,useEffect} from "react";
import './App.css';
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
  favColor: yup
  .string()
  .required("Bu alan boş bırakılamaz.")
  .min(2,"Renginiz 2 karakterden kısa olamaz."),
})

function App() {
  const[formData,setFormData] = useState({
    favColor: ""
  });

  const [formError, setFormError] = useState({
    favColor: ""
  })

  const [disabled,setDisabled] = useState(true);

  const [eklenen,setEklenen] = useState(null);

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabled(!valid));
  },[formData]);

  
  

  const checkFormErrors = (name,value) => {
    yup
    .reach(formSchema, name)
    .validate(value)
    .then(()=>{
      setFormError({...formError, [name]: ""})
    })
    .catch((err) => {
      setFormError({
        ...formError,[name]: err.errors[0]
      })
    })
  }

  const handleFormChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    checkFormErrors(name, value);
    setFormData({...formData, [name]: value})

    
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios.post("https://reqres.in/api/users",formData)
    .then((res)=> {
      setEklenen(res.data);
      setFormData({
        favColor: ""
      })
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <p>
          <label>
            <span>En sevdiğin renk</span><br/>
          <input
            name="favColor" 
            type="text" 
            className="cy-renkInput"
            value={formData.favColor}
            onChange={handleFormChange}
            />
          </label>
        </p>
        
        <p>
          <input type="submit" value="Gönder" className="cy-submit" disabled={disabled}/>
        </p>
        <div className="cy-error" style={{color: 'red'}}>
          {formError.favColor}
        </div>
        {eklenen && <div style={{color: eklenen.favColor}}>
          {eklenen.id} id numarasiyla renginiz başariyla eklendi.
        </div>}
      </form>
    </div>
  );
}

export default App;
