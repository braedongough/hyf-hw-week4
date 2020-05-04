import React from "react";

export const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    users: [],
    loading: false,
    error: null,
  };

  updateUserContext = (nextState) => {
    this.setState(nextState);
  };

  render() {
    return (
      <UserContext.Provider
        value={{ ...this.state, updateUserContext: this.updateUserContext }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
