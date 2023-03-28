import React, { useState } from 'react';
import './Question2.css';

function Question2() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    const searchUsers = async () => {
        const response = await fetch(`https://api.github.com/search/users?q=${username}`);
        const data = await response.json();
        setUsers(data.items);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username !== '') {
            searchUsers();
        }
    }

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="username" className="label">Enter GitHub username:</label>
                <div className="input-container">
                    <input
                        id="username"
                        type="text"
                        value={username}
                        className="input"
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="button">Search</button>
                </div>
            </form>

            <div className="results-container">
                {
                    users.map((user, index) => {
                        return (
                            <div key={index} className="user">
                                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                    <img src={user.avatar_url} alt={user.login} className="avatar" />
                                    <p className="username">{user.login}</p>
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Question2;
