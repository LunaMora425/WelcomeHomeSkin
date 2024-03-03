async function claimsTable(params = {}) {
	/* this is the most basic copy of FizzyElf's claims code stripped to just what we need
    
    then on the webpage itself, it has the div to append to of
    <div id="claims-table"></div>
    
    we would want to change the code to only look for the residents group (g_7) and make the table
    

    So this builds us a generic table of all the residents and their arrival dates
    */

	const residentsGroup = `:is(.g_7)`;

	/*fetch member list data*/
	let data = await $.get('/index.php?act=Members&max_results=1000');

	var doc = new DOMParser().parseFromString(data, 'text/html');

	$(`.claims-table-item${residentsGroup}`, doc).each(function () {
		// $('#claims-table').append($(this).show());
		let joinDate = $(this).find('.arrived').text();
		let name = $(this).find('.name').text();

		// Parse the join date
		let date = new Date(joinDate);
		let month = date.toLocaleString('default', { month: 'long' });
		let year = date.getFullYear();

		// Format the string
		let day = date.getDate();
		let suffix = ['th', 'st', 'nd', 'rd'][(((day % 100) - 20) % 10) - 1] || 'th';
		let formattedString = `${day}${suffix} - ${name}`;

		// Append to the corresponding month ID
		$(`#${month}-${year}-table`).append(formattedString);
	});
}
