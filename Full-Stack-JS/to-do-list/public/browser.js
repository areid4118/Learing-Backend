import { response } from "express";

function itemTemplate() {
	return `<li
	class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
>
	<span class="item-text">${item.text}</span>
	<div>
		<button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
		<button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
	</div>
</li>`;
}

const createField = document.getElementById('create-field');

document.addEventListener('click', async (e) => {
	// Create Feature
	document.getElementById('create-form').addEventListener('submit', (event) => {
		event.preventDefault();

		try {
			axios.post('/create-item', { text: createField.value });

			// create a new html element
			document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate(response));
		} catch (error) {
			console.log('Please try again later.');
		}
	});

	// Delete feature
	if (e.target.classList.contains('delete-me')) {
		if (await confirm('Do you really want to delete this item permanently?')) {
			try {
				axios.post('/delete-item', {
					id: e.target.getAttribute('data-id'),
				});
				e.target.parentElement.parentElement.remove();
			} catch (error) {
				console.log('Please try again later.');
			}
		}
	}

	// update feature
	if (e.target.classList.contains('edit-me')) {
		let userInput = await prompt(
			'Enter your desired new text',
			e.target.parentElement.parentElement.querySelector('.item-text').innerHTML,
		);

		if (userInput) {
			try {
				axios.post('/update-item', {
					text: userInput,
					id: e.target.getAttribute('data-id'),
				});
				e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput;
			} catch (error) {
				console.log('Please try again later.');
			}
		}
	}
});
