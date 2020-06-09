// Need to add a new folder because users do not have acces to our root file.
document.addEventListener('click', async (event) => {
	if (event.target.classList.contains('edit-me')) {
		let userInput = await prompt('Enter your desired new text');

      // gets the attribute from data-id and stores the id in the data base
		try {
			axios.post('/update-item', { text: userInput, id: event.target.getAttribute('data-id') });
		} catch (error) {
			console.log('Please try again later');
			throw new Error(error);
		}
	}
});
