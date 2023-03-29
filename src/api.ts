import axios from "axios";
interface Input {
	NoOfRatings: number;
	Category: number;
	Rating: number;
	Price: number;
	DangerousPermissionCount: number;
	SafePermissionCount: number;
	StoragePermission: number;
	PhoneCalls: number;
	SystemTools: number;
	NetworkCommunication: number;
	YourLocation1: number;
	HardwareControls: number;
	YourLocation2: number;
	NetworkCommunication2: number;
	SystemTools2: number;
	SystemTools3: number;
}

export default function (data: Input) {
	return new Promise((res, rej) =>
		axios({
			method: "post",
			url: "https://android-permission.onrender.com/predict",
			data,
			headers: {
				"Content-Type": "Application/JSON",
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((result) => res(result.data))
			.catch((err) => rej(err))
	);
}

// export default function (input: Input) {
// 	return new Promise((res, rej) => setTimeout(() => res("Malware"), 1000));
// }
