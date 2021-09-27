import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Card from "./Card/Card";
const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/posts";
const urlUserId = "https://jsonplaceholder.typicode.com/posts?userId=";

function App() {
	const [users, setUsers] = useState([]);
	const debounceOnChange = useCallback(debounce(changeHandler, 1000), []);
	useEffect(() => {
		fetchData(url);
	}, []);

	function debounce(func, wait) {
		let timeout;
		return function (...args) {
			const context = this;
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				timeout = null;
				func.apply(context, args);
			}, wait);
		};
	}

	function fetchData(link) {
		axios
			.get(link)
			.then((response) => {
				setUsers(response.data);
			})
			.catch(function (error) {
				console.log(error);
				alert("Something went wrong!");
			});
	}

	function changeHandler(e) {
		e.preventDefault();
		const value = e.target.value;
		let isnum = /^\d+$/.test(value);
		if (isnum || value === "") {
			if (e.target.value === "") {
				fetchData(url);
			} else {
				fetchData(urlUserId + value);
			}
		}
	}

	const userCards = users.map((user) => {
		return <Card key={user.id} userId={user.userId} title={user.title} body={user.body} />;
	});

	return (
		<div className="App">
			<h1>Made by Emiliano Russo</h1>
			<input placeholder="User Id" type="text" onChange={debounceOnChange}></input>
			<div className="container">{userCards}</div>
		</div>
	);
}

export default App;
