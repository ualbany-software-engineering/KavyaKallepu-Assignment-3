import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';

import UserService from "../services/user.service";
import axios from 'axios';

function External() {
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

    return (
        <div className="main mt-5 my-sm-5">
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
        </div>
    )
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        console.log(response.data)
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Users</h3>
        </header>
          <div className="row">
            <div className="col-12">
            <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Avatar</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Bio</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                  {typeof this.state.content === "string" ?
                  this.state.content :
                  this.state.content.map((item, i) => {
                      return [
                          <tr key={i}>
                             <th scope="row">{i}</th>
                             <td className="w-25">
                                <img src={item.avatar} class="img-fluid img-thumbnail" alt="Sheep"></img>
                              </td>
                            <td>{item.username}</td>
                            <td>{item.bio}</td>
                            <td>
                               <Link to={"/user/edit/"+item.username} >Edit</Link>
                            </td>
                          </tr>
                      ];
                    })}
              </tbody>
            </table>
            </div>
          </div>
          <External/>
      </div>
    );
  }
}
