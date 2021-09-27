import "./Card.css";

function Card(props) {
	return (
		<div className="Card">
			<h1>{props.title}</h1>
			<p>UserId: {props.userId}</p>
			<p>{props.body}</p>
		</div>
	);
}

export default Card;
