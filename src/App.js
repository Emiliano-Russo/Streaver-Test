import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card/Card";
const axios = require("axios");

const user = {
	userId: 10,
	id: 91,
	title: "aut amet sed",
	body: "libero voluptate eveniet aperiam sed\nsunt placeat suscipit molestias\nsimilique fugit nam natus\nexpedita consequatur consequatur dolores quia eos et placeat",
};

const url = "https://jsonplaceholder.typicode.com/posts";
const urlUserId = "https://jsonplaceholder.typicode.com/posts?userId=";

function App() {
	const [users, setUsers] = useState([]);

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

	useEffect(() => {
		fetchData(url);
	}, []);

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
			<h1>Insight-Softworks Test</h1>
			<input placeholder="User Id" type="text" onChange={changeHandler}></input>
			<div className="container">{userCards}</div>
		</div>
	);
}

export default App;
