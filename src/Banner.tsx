import image from "./assets/mobile-malware.jpeg";
function Banner() {
	return (
		<div>
			<div className="hero min-h-screen bg-base-200">
				<div className="max-w-3xl hero-content flex-col ">
					<img src={image} className="rounded-lg shadow-2xl" />
					<div>
						<h1 className="text-5xl font-bold">Detect Suspicious Apps!</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
						</p>
						<button className="btn btn-primary mx-auto">Get Started</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Banner;
