import React, {useState} from "react";
import axios from 'axios';

function Home() {
const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.covid19api.com/summary`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        const covidList = response.data.Countries.filter((item) => {
          return item.Country.toLowerCase().includes(location.toLowerCase())
        });
        setData(covidList[0])
        // console.log(newList)
      })
      setLocation('')
    }
  }
  const user_name = JSON.parse(localStorage.getItem('user_name'));
  const [name, setName] = useState(user_name);

  const user_description = JSON.parse(localStorage.getItem('user_description'));
  const [description, setDesc] = useState(user_description);

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('user_description', JSON.stringify(description));
    localStorage.setItem('user_name', JSON.stringify(name));
    document.getElementsByClassName('btn-close')[0].click();
  };


  const [ firstNumber, setFirstNumber ] = useState(0);
  const [ secondNumber, setSecondNumber ] = useState(0);
  const [ result, setResult ] = useState(0);

  const getSummation = () => {
    fetch(`http://localhost:8080/addition?firstNumber=${firstNumber}&secondNumber=${secondNumber}`)
        .then(response => response.json())
        .then((data) => {
          setResult(data.result)
        } )
        .catch(err => console.error(err));
  }

    return (
        <div className="main mt-5 my-sm-5">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">User information</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" value={name} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea onChange={(e) => setDesc(e.target.value)} className="form-control" id="description" rows="3" value={description}>{description}</textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
                <div className="row mb-5">
                  <div className="col eidit-col">
                    <button type="button" className="btn edit-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="img/editing.png"  alt="edit"/></button>
                  </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-sm-12 col-md-3 mx-auto">
                        <div className="card-img">
                          <img src="img/300.png" className="img-thumbnail" alt="" />
                        </div>
                    </div>
                    <div className="col-12 content-section">
                        <div className="card-title mt-5">
                            <h1 className="fw-semibold text-md-center text-lg-center">{name}</h1>
                            <p className=" fs-6">{description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
              <div className="row">
                <div className="col-12">
                    <div className="app">
                    <h2>Check covid </h2>
                    <div className="search mt-3 mb-3">
                      <input
                        value={location}
                        className="form-control"
                        onChange={event => setLocation(event.target.value)}
                        onKeyPress={searchLocation}
                        placeholder='Enter Location'
                        type="text" />
                    </div>
                    </div>
                  </div>
                  
                  {data !== '' && (
                    <div className="row">
                    <div className="col-12">
                      <div className="wrapper">
                        <h2>Country: <strong>{data.Country}</strong></h2>
                        <h4>New Confirmed: <strong>{data.NewConfirmed}</strong></h4>
                        <h4>New Deaths: <strong>{data.NewDeaths}</strong></h4>
                        <h4>New Confirmed: <strong>{data.TotalConfirmed}</strong></h4>
                        <h4>New Deaths: <strong>{data.TotalDeaths}</strong></h4>
                        <h4>New Recovered: <strong>{data.TotalRecovered}</strong></h4>
                      </div>
                    </div>
                  </div>
                  )}
              </div>
            </div>
		
            <div className="container mt-5">
                <div className="row">
                  <div className="col">
                    <div className="container mt-5">
                      <div className="row">
                      <h2 className="mb-5">Check two number summation </h2>
                        <div className="col">
                        <div className="summation_of_two_number">
                      {/* make two input with  */}
                      <div className="form-group">
                        <label htmlFor="first-number">First number</label>
                        <input type="number" value={firstNumber} onChange={(e) => setFirstNumber(e.target.value)} className="form-control" id="first-number" placeholder="First number" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="number2">Second number</label>
                        <input type="number" value={secondNumber} onChange={(e) => setSecondNumber(e.target.value)} className="form-control" id="number2" placeholder="Second number" />
                      </div>
                      <div className="result mt-3 mb-3">
                        <span>{result}</span>
                      </div>
                      <button type="button" onClick={() => getSummation()} className="btn btn-primary">SUM</button>
                    </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            
        </div>
    )
}

export default Home;
