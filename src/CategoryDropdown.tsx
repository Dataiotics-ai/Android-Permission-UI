const map: any = {
	"Arcade & Action": 0,
	"Books & Reference": 1,
	"Brain & Puzzle": 2,
	Business: 3,
	"Cards & Casino": 4,
	Casual: 5,
	Comics: 6,
	Communication: 7,
	Education: 8,
	Entertainment: 9,
	Finance: 10,
	"Health & Fitness": 11,
	"Libraries & Demo": 12,
	Lifestyle: 13,
	"Media & Video": 14,
	Medical: 15,
	"Music & Audio": 16,
	"News & Magazines": 17,
	Personalization: 18,
	Photography: 19,
	Productivity: 20,
	Racing: 21,
	Shopping: 22,
	Social: 23,
	Sports: 24,
	"Sports Games": 25,
	Tools: 26,
	Transportation: 27,
	"Travel & Local": 28,
	Weather: 29,
};

export default function ({
	category,
	setCategory,
}: {
	category: number;
	setCategory: React.Dispatch<React.SetStateAction<number>>;
}) {
	let name = "";
	Object.keys(map).map((item, index) => {
		if (map[item] === category) name = item;
	});
	return (
		<>
			<div className="w-full dropdown">
				<label tabIndex={0} className="w-full btn btn-outline btn-primary">
					{name || "Select Category"}
				</label>
				<div
					tabIndex={0}
					className="border min-w-full max-w-full flex-col dropdown-content menu p-2 max-h-96 overflow-auto  shadow bg-base-100"
				>
					{Object.keys(map).map((item, index) => (
						<div
							key={index}
							className="p-2 border hover:bg-slate-100 hover:cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setCategory(map[item]);
							}}
						>
							<div>{item}</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
