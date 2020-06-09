document.addEventListener('click', async (e) => {
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
