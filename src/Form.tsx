import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import api from "./api";
import mapping from "./mapping.json";
function Form() {
	const permissions = [
		"Storage : modify/delete USB storage contents modify/delete SD card contents (D)",
		"Phone calls : read phone state and identity (D)",
		"System tools : prevent device from sleeping (D)",
		"Network communication : view network state (S)",
		"Your location : fine (GPS) location (D)",
		"Hardware controls : control vibrator (S)",
		"Your location : coarse (network-based) location (D)",
		"Network communication : view Wi-Fi state (S)",
		"System tools : automatically start at boot (S)",
		"System tools : set wallpaper (S)",
	];
	const [name, setName] = useState("");
	const [category, setCategory] = useState<number>(-1);
	const [description, setdescription] = useState("");
	const [packageName, setpackage] = useState("");
	const [downloads, setDownloads] = useState<number>(0);
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
	const [price, setPrice] = useState(0);
	const [rating, setRating] = useState(1);
	const [result, setResult] = useState<"Malware" | "Not Malware">();
	const [isLoading, setisLoading] = useState(false);
	const predict = () => {
		setisLoading(true);
		api({
			NoOfRatings: downloads,
			Category: category < 0 ? 0 : category,
			Rating: rating,
			Price: parseInt(price.toString()) / 87,
			DangerousPermissionCount: selectedPermissions.filter((p) =>
				p.includes("(D)")
			).length,
			SafePermissionCount: selectedPermissions.filter((p) => p.includes("(S)"))
				.length,
			StoragePermission: selectedPermissions.filter((p) =>
				p.includes("Storage")
			).length,
			PhoneCalls: selectedPermissions.filter((p) => p.includes("Phone calls"))
				.length,
			SystemTools: selectedPermissions.filter((p) =>
				p.includes("System tools : prevent device from sleeping (D)")
			).length,
			NetworkCommunication: selectedPermissions.filter((p) =>
				p.includes("Network communication : view network state (S)")
			).length,
			YourLocation1: selectedPermissions.filter((p) =>
				p.includes("Your location : fine (GPS) location (D)")
			).length,
			HardwareControls: selectedPermissions.filter((p) =>
				p.includes("Hardware controls")
			).length,
			YourLocation2: selectedPermissions.filter((p) =>
				p.includes("Your location : coarse (network-based) location (D)")
			).length,
			NetworkCommunication2: selectedPermissions.filter((p) =>
				p.includes("Network communication : view Wi-Fi state (S)")
			).length,
			SystemTools2: selectedPermissions.filter((p) =>
				p.includes("System tools : automatically start at boot (S)")
			).length,
			SystemTools3: selectedPermissions.filter((p) =>
				p.includes("System tools : set wallpaper (S)")
			).length,
		})
			.then((res) => {
				if (/\d/.test(packageName)) setResult("Malware");
				else if (/<[a-z][\s\S]*>/i.test(description)) setResult("Malware");
				else if (res === "Malware") setResult("Malware");
				else setResult("Not Malware");
			})
			.catch((err) => console.error(err))
			.finally(() => setisLoading(false));
	};
	return (
		<>
			<div className="w-full flex-col p-8 h-screen">
				<h1 className="text-3xl ml-8 my-16 text-center font-bold text-primary">
					App Details
				</h1>
				<div className="mx-auto max-w-3xl">
					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-6 form-control w-full">
							<label className="label">
								<span className="label-text text-primary">App Name</span>
							</label>
							<input
								type="text"
								placeholder=""
								className="input input-primary input-bordered w-full"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="col-span-6 form-control w-full">
							<label className="label">
								<span className="label-text text-primary">
									Number of downloads in PlayStore
								</span>
							</label>
							<input
								type="number"
								placeholder=""
								className="input input-primary input-bordered w-full"
								onChange={(e) => setDownloads(parseInt(e.target.value))}
							/>
						</div>
						<div className="col-span-12 form-control w-full ">
							<CategoryDropdown category={category} setCategory={setCategory} />
						</div>
						<div className="col-span-12 form-control w-full ">
							<label className="label">
								<span className="label-text text-primary">Package Name</span>
							</label>
							<input
								placeholder=""
								className="input input-primary input-bordered w-full"
								value={packageName}
								onChange={(e) => {
									setpackage(e.target.value);
								}}
							/>
						</div>
						<div className="col-span-12 form-control w-full ">
							<label className="label">
								<span className="label-text text-primary">
									App description as given in Playstore
								</span>
							</label>
							<textarea
								placeholder=""
								className="textarea textarea-primary input-bordered w-full"
								value={description}
								onChange={(e) => setdescription(e.target.value)}
							/>
						</div>
						<div className="col-span-6 form-control w-full ">
							<label className="label">
								<span className="label-text text-primary">
									App rating in Playstore
								</span>
							</label>
							<div className="rating rating-lg">
								<Star select={() => setRating(1)} isSelected={rating >= 1} />
								<Star select={() => setRating(2)} isSelected={rating > 1} />
								<Star select={() => setRating(3)} isSelected={rating > 2} />
								<Star select={() => setRating(4)} isSelected={rating > 3} />
								<Star select={() => setRating(5)} isSelected={rating > 4} />
							</div>
						</div>
						<div className="col-span-6 form-control w-full ">
							<label className="label">
								<span className="label-text text-primary">
									Price of the app:{" "}
									<b>
										₹
										{`${price.toLocaleString("in")}${
											price === 100000 ? "+" : ""
										}`}
									</b>
								</span>
							</label>
							<input
								type="range"
								value={price}
								onChange={(e) => setPrice(e.target.value as any)}
								min={0}
								max={25000}
								className="mt-2 range range-sm range-primary"
							/>
						</div>
					</div>
				</div>
				<h2 className="text-xl ml-8 text-center pt-16 font-bold text-primary">
					Permissions requested by the App
				</h2>
				<div className="grid grid-cols-12 p-8 gap-3">
					{permissions.map((data) => (
						<button
							key={data}
							onClick={() =>
								setSelectedPermissions((p) => {
									if (p.includes(data)) return p.filter((x) => x !== data);
									return [...p, data];
								})
							}
							className={`p-2 btn btn-sm ${
								selectedPermissions.includes(data)
									? "btn-success"
									: "btn-outline"
							} col-span-12 lg:col-span-6`}
						>
							{data.replaceAll(" (D)", "").replaceAll(" (S)", "")}
						</button>
					))}
				</div>
				<div className="w-full flex justify-center items-center pb-12">
					<button
						onClick={() => {
							setResult(undefined);
						}}
						className="btn btn-secondary w-full max-w-xl mx-auto"
					>
						Clear
					</button>
					<button
						onClick={predict}
						className={`btn btn-primary w-full max-w-xl mx-auto ${
							isLoading ? "loading" : ""
						}`}
					>
						Predict
					</button>
				</div>
				{result && !isLoading && (
					<div
						className={`text-4xl text-center font-bold py-12 mb-12  ${
							result === "Malware"
								? "bg-red-100 text-error"
								: "bg-green-100 text-success"
						}`}
					>
						{name} is {result}
					</div>
				)}
				<div className="pb-12" />
			</div>
		</>
	);
}

export default Form;

const Star = ({ isSelected, select }: any) => {
	return (
		<>
			<input
				onClick={() => select()}
				checked={isSelected}
				className={`mask mask-star-2 ${
					isSelected ? "bg-orange-400" : "bg-orange-100"
				}`}
			></input>
		</>
	);
};
