const categoryContainer = document.getElementById("category-container");
const treeContainer = document.getElementById("tree-container");
const allTree = document.getElementById("all-tree");
const totalContainer = document.getElementById("total-container");
const modal = document.getElementById("modal");

// load category

const loadAllTree = () => {
	const url = "https://openapi.programming-hero.com/api/plants";
	fetch(url)
		.then(res => res.json())
		.then(elements => {
			// console.log(elements);
			treeContainer.innerHTML = "";
			for (let element of elements.plants) {
				treeContainer.innerHTML += `
                <div class="bg-white shadow-md rounded-lg  card-parent flex flex-col">
                <div class="p-4 flex flex-col flex-1">
                <img class="h-[200px] w-full object-cover rounded-md" src="${element.image}" />

                <h1 class="text-lg font-bold mt-3 name">${element.name}</h1>
                <p id="${element.id}" class="text-sm leading-6 max-h-12 overflow-hidden my-2 description flex-1">${element.description}</p>
                <div class="flex justify-between items-center mb-3">
                <h1 class="bg-[#dcfce7] text-[#15803d] font-medium py-1 px-3 text-sm rounded-full">${element.category}</h1>
                <p class="price font-bold text-[#15803d]"><i class="mx-1 fa-solid fa-bangladeshi-taka-sign"></i>${element.price}</p>
                </div>
                <button class="bg-[#15803d] w-full text-white mt-auto py-2 rounded-full">Add to Cart</button>
                </div>
                </div>
                `;
				const id = element.id;
				loadDetails(id);
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
	categories.forEach(li => {
		// console.log(li);
		categoryContainer.innerHTML += `
                <li id="${li.id}" class="mb-5 hover:bg-[#15803d]  md:w-[70%] px-2 py-1 hover:text-white hover:rounded-lg cursor-pointer category">${li.category_name}</li>
                `;
	});
	categoryContainer.addEventListener("click", e => {
		// console.log(e.target);

		if (e.target.classList.contains("category")) {
			const allLi = document.querySelectorAll("li");
			const tree = document.getElementById("all-tree");
			// console.log(tree);
			allLi.forEach(li => {
				li.classList.remove("bg-[#15803d]", "text-white", "rounded-lg");
			});
			// console.log(e.target.localName);
			if (e.target.localName === "li") {
				// console.log("li click");

				e.target.classList.add("bg-[#15803d]", "text-white", "rounded-lg");
			}

			const id = e.target.id;
			// console.log(id);
			loadPlantByCategory(id);
		}
	});
};

const loadPlantByCategory = id => {
	treeContainer.innerHTML = "";
	showLoading();
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
		// console.log(typeof plant);
		treeContainer.innerHTML += `
                <div class="bg-white shadow-md rounded-lg h-[420px]  card-parent flex flex-col">
                <div class="p-4 flex flex-col ">
                <img class="h-[200px] w-full object-cover rounded-md" src="${plant.image}" />
                <h1 class="text-lg font-bold mt-3 name">${plant.name}</h1>
                <p id="${plant.id}" class="text-sm leading-6 max-h-12 overflow-hidden my-2 description flex-1">${plant.description}</p>
                <div class="flex justify-between items-center mb-3">
                <h1 class="bg-[#dcfce7] text-[#15803d] font-medium py-1 px-3 text-sm rounded-full">${plant.category}</h1>
                <p class="price font-bold text-[#15803d]"><i class="mx-1 fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
                </div>
                <button class="bg-[#15803d] w-full text-white mt-auto py-2 rounded-full">Add to Cart</button>
                </div>
                </div>
                `;
		const id = plant.id;
		// console.log(id);
		loadDetails(id);
	}
};
const tree = document.getElementById("all-tree");

let total = 0;
treeContainer.addEventListener("click", e => {
	// console.log(e.target.innerText);
	if (e.target.innerText === "Add to Cart") {
		const parent = e.target.closest(".card-parent");
		const price = parent.querySelector(".price");
		const name = parent.querySelector(".name").innerText;

		const convertPrice = parseInt(price.innerText);

		let totalPrice = parseInt((total += convertPrice));
		// console.log(totalPrice);
		// alert("money added");
		const cartContainer = document.getElementById("cart-container");
		cartContainer.innerHTML += `
		            <div class="flex justify-between bg-[#f0fdf4] p-4 mx-3 items-center rounded-lg mb-3 cart-item overflow-y-auto">
                    <div>
                    <h1 class="font-semibold">${name}</h1>
                    <p class="item-price"><i class="mx-1 fa-solid fa-bangladeshi-taka-sign"></i>${convertPrice}</p>
                    </div>
                    <div>
                    <i class="text-red-600 text-lg cursor-pointer fa-solid fa-xmark delete-btn"></i>
                    </div>
                    </div>
				
		`;
		if (totalContainer.style.display === "none") {
			totalContainer.style.display = "block";
		}
		totalContainer.innerHTML = `
		<div class="flex items-center justify-between px-4">
		<div><p class="font-bold">total:</p></div>
		<div><i class="mx-1 fa-solid fa-bangladeshi-taka-sign"></i>${total}</div>
		</div>
		`;
	}

	if (e.target.classList.contains("delete-btn")) {
		const item = e.target.closest("cart-item");
		console.log(item);
	}
});

// delete cart
const cartContainer = document.getElementById("cart-container");
// console.log(cartContainer);

cartContainer.addEventListener("click", e => {
	const target = e.target;
	// console.log(target);
	if (e.target.classList.contains("delete-btn")) {
		const item = target.closest(".cart-item");
		const totalContainer = document.getElementById("total-container");
		const itemPrice = parseInt(item.querySelector(".item-price").innerText);
		total -= itemPrice;
		console.log(total);
		item.remove();
		if (cartContainer.children.length === 0) {
			totalContainer.style.display = "none";
		} else {
			// totalContainer.innerText = `Total: ${total}`;
			totalContainer.innerHTML = `
		<div class="flex items-center justify-between px-4">
		<div>
		<p class="font-bold">total:</p>
		</div>
		<div>
		<i class="mx-1 fa-solid fa-bangladeshi-taka-sign"></i>${total}
		</div>
		</div>`;
		}
	}
});

treeContainer.addEventListener("click", e => {
	if (e.target.classList.contains("description")) {
		// console.log(e.target.id);
		const plantId = e.target.getAttribute("id");
		document.getElementById("my_modal_5").showModal();
		console.log(plantId);
		loadDetails(plantId);
	}
});

const loadDetails = id => {
	const url = `https://openapi.programming-hero.com/api/plant/${id}`;
	fetch(url)
		.then(res => res.json())
		.then(data => {
			const allPlants = data.plants;
			modal.innerHTML = "";
			// console.log(allPlants);
			modal.innerHTML += `
			<h1 class="font-bold">${allPlants.name}</h1>
			<img class="h-[250px] w-full object-cover rounded-lg mt-3" src="${allPlants.image}" />
			<h1 class="my-3"><span class="font-bold">Category:</span> ${allPlants.category}</h1>
			<p class="mb-3 f"><span class="font-bold">Price:</span><i class="text-sm mx-1 fa-solid fa-bangladeshi-taka-sign"></i>${allPlants.price}</p>
			<p><span class="font-bold">Description:</span> ${allPlants.description}</p>
			`;
		});
};

const showLoading = () => {
	treeContainer.innerHTML = `
   <div class="flex justify-center items-center w-[300%]">
   <span class="loading loading-bars loading-lg"></span>
   </div>
	`;
};

loadCategory();
loadAllTree();
