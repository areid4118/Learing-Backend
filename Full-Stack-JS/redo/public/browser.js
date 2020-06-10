const editListItem = (event) => {
	if (event.target.classList.contains('edit-me')) {
		let userInput = prompt(
			'Enter your desired text',
			event.target.parentElement.parentElement.querySelector('.item-text').innerHTML,
		);

		if (userInput) {
			axios
				.post('/update-item', { text: userInput, id: event.target.getAttribute('data-id') })
				.then(() => {
					event.target.parentElement.parentElement.querySelector(
						'.item-text',
					).innerHTML = userInput;
				})
				.catch(() => {
					console.log('Please try again later.');
				});
		}
	}
};

const deleteListItem = (event) => {
	if (event.target.classList.contains('delete-me')) {
		let confirmMessgage = confirm('Are you sure you want to permanently delete this item?');

		if (confirmMessgage) {
			axios
				.post('/delete-item', { id: event.target.getAttribute('data-id') })
				.then(() => {
					event.target.parentElement.parentElement.remove();
				})
				.catch(() => {
					console.log('Please try again later.');
				});
		}
	}
};

const form = document.querySelector('form');
const submitInput = document.querySelector('#submitInput');
let itemListGroup = document.querySelector('#item-list-group');

const itemTemplate = (item) => {
	return `
	<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
	<span class="item-text">${item.text}</span>
	<div>
		<button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
		<button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
	</div>
	</li>
`;
};

const createListItem = (event) => {
	event.preventDefault();
	axios
		.post('/create-item', { text: submitInput.value })
		.then((response) => {
			itemListGroup.insertAdjacentHTML('beforeend', itemTemplate(response.data));
			submitInput.value = '';
			submitInput.focus();
		})
		.catch(() => {
			console.log('Please try again later.');
		});
};

document.addEventListener('click', editListItem);
document.addEventListener('click', deleteListItem);
form.addEventListener('submit', createListItem);
