import { useState } from "react";
import Banner from "./Banner";
import Form from "./Form";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Form />
		</div>
	);
}

export default App;
