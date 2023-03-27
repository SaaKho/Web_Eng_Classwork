import React, { useState } from 'react';

/*Question2 of the Assignment 2*/
function Question2() {
    /*Creating a state variable called username and function to set username*/
    const [username, setUsername] = useState(''); // Empty string is the initial value of the state variable

    /*Creating a state variable array called users and function to set users*/
    const [users, setUsers] = useState([]); // Empty array is the initial value of the state variable

    // Function to call GitHub API for searching users
    const searchUsers = async () => {
        const response = await fetch(`https://api.github.com/search/users?q=${username}`);
        const data = await response.json();
        setUsers(data.items);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (username !== '') {
            searchUsers();
        }
    }

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    }

    //console.log(username);
    //console.log(users);

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: "flex", marginBottom: "1 rem" }}>
                <label htmlFor="username" style={{ marginRight: "1 rem" }}>Enter GitHub username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    style={{ flexGrow: "1", marginRight: "1rem" }}
                    onChange={handleInputChange}
                />
                <button type="submit" style={{ backgroundColor: 'aqua', color: "#FFF", borderRadius: "4px", border: "none", padding: "0.5rem 1rem" }}>Search</button>
            </form>

            <div>
                {
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <a href={user.html_url} target="_blank">
                                    <img src={user.avatar_url} />
                                    {user.login}
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
export default Question2
