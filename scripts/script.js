const categoryContainer = document.getElementById("category-container");
const treeContainer = document.getElementById("tree-container");
const allTree = document.getElementById("all-tree");
// load category

const loadAllTree = () => {
	const url = "https://openapi.programming-hero.com/api/plants";
	fetch(url)
		.then(res => res.json())
		.then(elements => {
			console.log(elements);
			treeContainer.innerHTML = "";
			for (let element of elements.plants) {
				// console.log(element);
				// document.getElementById("all-tree").addEventListener("click", () => {
				treeContainer.innerHTML += `
                 <div class="bg-white shadow-md rounded-lg h-[490px]">
                <div class="p-4">
                <img class="h-[200px] w-full object-cover rounded-md" src="${element.image}" />

                <h1 class="text-lg font-bold mt-3">${element.name}</h1>
                <p class="text-sm text-[#1f2937] my-2">${element.description}</p>
                <div class="flex justify-between">
                <h1 class="bg-[#dcfce7] text-[#15803d] font-medium py-1 px-3 text-sm rounded-full">${element.category}</h1>
                <p>${element.price}</p>
                </div>
                <button class="bg-[#15803d] w-full text-white mt-3 py-2 rounded-full">Add to Cart</button>
                </div>
                </div>
                `;
				// });
			}
		});
};

const loadCategory = () => {
	const url = "https://openapi.programming-hero.com/api/categories";
	fetch(url)
		.then(res => res.json())
		.then(data => {
			const categories = data.categories;
			showCategory(categories);
		});
};

const showCategory = categories => {
	categoryContainer.innerHTML = "";

	// categoryContainer.innerHTML += `
	// <li id="all-tree">All Tree</li>
	// `;
	// *******

	// *******
	categories.forEach(li => {
		// console.log(li);
		categoryContainer.innerHTML += `
                <li id="${li.id}" class="mb-5 hover:bg-[#15803d] w-[70%] px-2 py-1 hover:text-white hover:rounded-lg cursor-pointer">${li.category_name}</li>
                `;
	});
	//
	categoryContainer.addEventListener("click", e => {
		// console.log(e.target);
		const allLi = document.querySelectorAll("li");
		allLi.forEach(li => {
			li.classList.remove("bg-[#15803d]", "text-white", "rounded-lg");
		});
		// console.log(e.target.localName);
		if (e.target.localName === "li") {
			// console.log("li click");
			e.target.classList.add("bg-[#15803d]", "text-white", "rounded-lg");
		}
		const id = e.target.id;
		loadPlantByCategory(id);
	});
};

const loadPlantByCategory = id => {
	treeContainer.innerHTML = "";
	const url = `https://openapi.programming-hero.com/api/category/${id}`;
	fetch(url)
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			const plants = data.plants;
			// console.log(plants);
			showPlantByCategory(plants);
		});
};

const showPlantByCategory = plants => {
	treeContainer.innerHTML = "";
	for (let plant of plants) {
		// console.log(plant);
		treeContainer.innerHTML += `
                <div class="bg-white shadow-md rounded-lg h-[490px]">
                <div class="p-4">
                <img class="h-[200px] w-full object-cover rounded-md" src="${plant.image}" />

                <h1 class="text-lg font-bold mt-3">${plant.name}</h1>
                <p class="text-sm text-[#1f2937] my-2">${plant.description}</p>
                <div class="flex justify-between">
                <h1 class="bg-[#dcfce7] text-[#15803d] font-medium py-1 px-3 text-sm rounded-full">${plant.category}</h1>
                <p>${plant.price}</p>
                </div>
                <button class="bg-[#15803d] w-full text-white mt-3 py-2 rounded-full">Add to Cart</button>
                </div>
                </div>
                `;
	}
};
loadCategory();
loadAllTree();
document.getElementById("all-tree").addEventListener("click", loadAllTree);
