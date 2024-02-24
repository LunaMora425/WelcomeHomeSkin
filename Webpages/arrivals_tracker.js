async function claimsTable(params = {}) {
	const ignoreGroups = (params.ignoreGroups || ['4', '5']).map((x) => `:not(.g_${x})`).join('');
	const reservedGroups = (params.reservedGroups || ['1', '3']).map((x) => `.claims-table-item.g_${x}`).join(', ');
	const sortOrderLists = params.sortOrderLists || {};
	const cloneHeaders = params.repeatHeaders || params.repeatSortableHeaders;
	const cloneWithEvents = !!params.repeatSortableHeaders;

	$().ready(function () {
		let creditline = $(
			`<span style="font-size: 90%; font-family: roboto, verdana, arial, sans"> Claims Code âœ‘ by <a href="http://fizzyelf.jcink.net">FizzyElf</a> <span style="background: currentColor;-webkit-background-clip: text;-webkit-text-fill-color: transparent;text-shadow: none;">ðŸ¾</span></span>`,
		);
		if (!$('span:contains("Claims Code âœ‘ by")').length && !$('#fizzcredits').append(creditline).length) {
			$('#claims-table').after(creditline);
		}
	});
	$('<style />').appendTo($('head')).html(`
        #claims-table {
            display:flex;
            flex-direction:column;
            margin-bottom: 1em;
        }
        #claims-table-headers, .claims-table-item, .claims-table-headers {
            display: grid;
            grid-template-columns: repeat(${$('#claims-table-headers div').length}, 1fr);
            gap: 1em; 
        }
        #claims-table-headers, .claims-table-headers {
            border-bottom: 1px solid;
            padding-bottom: 1px;
            margin-bottom: 1px;
            font-weight: bold;
            text-align: center;
        }
        #claims-table-headers div:not(.nosort), .claims-table-headers div:not(.nosort)  {
            cursor: pointer;
        }
        .reserved {
            font-style: italic;
        }
        .expired .faceclaim {
            text-decoration: line-through;
        }
        
        .faceclaim .joined:before {content: '[reserved on: ';}
        .faceclaim .joined:after {content: ' ]';}

        .hidenofc.nofc,
        .nofc .faceclaim .joined,
        .claims-table-item:not(.reserved) .faceclaim .joined {
            display: none;
        }
    `);
	$('#claims-table-headers div:not(.alpha):not(.number').each((i, e) => {
		if (!sortOrderLists[e]) {
			$(e).addClass('nosort');
		}
	});

	/* sort handler */
	$('#claims-table-headers').on('click', 'div', (evt) => {
		const column = evt.target.id;
		const isNumeric = /number/i.test(evt.target.className);
		const isReversed = /desc/i.test(evt.target.className);
		const isDate = /date/i.test(evt.target.className);
		$('.claims-table-item').each((i, e) => {
			let num = -1;
			let txt = $(e)
				.children('.' + column)
				.contents()
				.not(
					$(e)
						.children('.' + column)
						.children('.joined'),
				)
				.text()
				.trim()
				.toLowerCase();
			if (isNumeric) {
				num = parseInt(txt);
			} else if (txt != '' && sortOrderLists[column].includes(txt)) {
				num = (txt.charCodeAt(0) - 96) * 1000 + sortOrderLists[column].indexOf(txt);
			}
			if (isReversed) {
				num = 0 - num;
			}
			$(e).css('order', num.toString());
		});
	});

	if (cloneHeaders) {
		$('.claims-table-section').each(function () {
			$(this).after(
				$('#claims-table-headers')
					.clone(cloneWithEvents)
					.attr('id', '')
					.addClass('claims-table-headers')
					.toggleClass('nosort', !cloneWithEvents)
					.css('order', (parseInt($(this).css('order')) + 1).toString()),
			);
		});
	}

	/*fetch member list data*/
	let data = await $.get('/index.php?act=Members&max_results=1000');

	var doc = new DOMParser().parseFromString(data, 'text/html');
	$(`.claims-table-item${ignoreGroups}`, doc).each(function () {
		$('#claims-table').append($(this).show());
	});

	/* create sort order lists for columns with 'alpha' class */
	$('#claims-table-headers div').each((i, e) => {
		const column = e.id;
		if (/alpha/i.test(e.className)) {
			sortOrderLists[column] = [];
			$('.claims-table-item .' + column).each((i, e) => {
				sortOrderLists[column].push($(e).contents().not($(e).children('.joined')).text().trim().toLowerCase());
			});
			/* remove duplicates and sort */
			sortOrderLists[column] = [...new Set(sortOrderLists[column])];
			sortOrderLists[column].sort();
		}
	});
	if (params.initialSort) {
		$('#' + params.initialSort).click();
	}
	$(reservedGroups).each((i, x) => {
		$(x).addClass('reserved');
		let dt = new Date($(x).find('.joined').text());
		if (dt.toString() != 'Invalid Date' && params.reservationsExpire) {
			dt.setDate(dt.getDate() + params.reservationsExpire * 7);
			if (dt.toString() != 'Invalid Date' && new Date() > dt) $(x).addClass('expired');
		}
	});
	$('.faceclaim').each((i, x) => {
		if ($(x).contents().not($(x).children()).text().trim() == '') $(x).closest('.claims-table-item').addClass('nofc');
	});
}
