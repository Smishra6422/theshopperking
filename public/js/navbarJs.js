
    	var toggle = document.getElementById('toggle')
        var toggleMenu = document.getElementById('toggle-menu')
		var shopName = document.getElementsByClassName('shop-name')[0]
		var leftMenuBar = document.getElementsByClassName('left-menu')[0]
		var searchSuggestion = document.getElementById('search-suggestion')
		var searchInput = document.getElementById('search-input')
		var closeButton = document.getElementById('close-icon')
		var searchSuggestionList = document.getElementsByClassName('search-suggestion-li')

    	window.addEventListener('mouseup', function(event) {
    			
    			
    		 		if(event.target != toggle && event.target.parentNode != toggleMenu && event.target != shopName) {
    		 		toggle.style.display = 'none';
    		 		leftMenuBar.style.display = 'block'
    		 		
    		 	}   

        })

        searchInput.addEventListener('keyup', function(event) {
        	event.preventDefault()

        	if(searchInput.value.length >= 1) {
        		searchSuggestion.style.display = 'block';
        	} else {
        		searchSuggestion.style.display = 'none';
			}
			
			// manipulate search input and apply filter acc to user search

			const searchInputValue = event.target.value.toLowerCase();

			Array.from(searchSuggestionList).forEach(suggestionItems => {
				SuggestionList = suggestionItems.firstElementChild.textContent
				if(SuggestionList.toLowerCase().includes(searchInputValue) ) {
					suggestionItems.style.display = 'block'
					// console.log(SuggestionList)
				} else {
					suggestionItems.style.display = 'none'
				}
			})

        
        })

        closeButton.addEventListener('click', function() {
        	searchInput.value = ""
        })