import React from "react";
import ReactDOM from "react-dom";
import UserProvider, { UserContext } from "./user.context";

const Users = () => {
  const { users, loading, error } = React.useContext(UserContext);

  if (error) {
    return <div>{`error fetching ${error}...`}</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  if (!users.length) {
    return <div>No results...</div>;
  }

  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.login}</li>;
      })}
    </ul>
  );
};

const Search = () => {
  const { updateUserContext } = React.useContext(UserContext);
  const handleSearch = async (event) => {
    try {
      updateUserContext({ loading: true });

      const res = await fetch(
        `https://api.github.com/search/users?q=${event.target.value}`
      );
      const usersRequest = await res.json();
      updateUserContext({ users: usersRequest.items });
    } catch (err) {
      updateUserContext({ error: err.message });
    } finally {
      updateUserContext({ loading: false });
    }
  };

  return <input type="text" onChange={handleSearch} />;
};
class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <h1>User Search</h1>
        <Search />
        <Users />
      </UserProvider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
