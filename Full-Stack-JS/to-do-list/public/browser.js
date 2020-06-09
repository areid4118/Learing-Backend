// Need to add a new folder because users do not have acces to our root file.
document.addEventListener('click', async (event) => {
	if (event.target.classList.contains('edit-me')) {
		let userInput = await prompt('Enter your desired new text');

		try {
			axios.post('/update-item', { text: userInput });
		} catch (error) {
			console.log('Please try again later');
			throw new Error(error);
		}
	}
});
