import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { withRouter } from '../common/with-router';
import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        bio: "",
      },
      message: "",
      redirect:""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser)
    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true })

  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        bio: description
      }
    }));
  }

  getUser(id) {
    UserDataService.getUserBoard(id)
      .then(response => {
        console.log(response.data)
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateUser() {
    UserDataService.update(
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentUser } = this.state;
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User update</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Username">username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentUser.bio}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(User);
