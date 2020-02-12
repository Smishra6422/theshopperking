		var navMeuButton = document.getElementsByClassName('menu-bar')[0]
    	var toggle = document.getElementById('toggle')
		var toggleMenu = document.getElementById('toggle-menu')
		var toggleMenuButton = document.getElementById('toggle-menu-button') 
		var toggleCloseButton = document.getElementById('toggle-close') 
		var shopName = document.getElementsByClassName('shop-name')[0]
		var leftMenuBar = document.getElementsByClassName('left-menu')[0]
		var searchSuggestion = document.getElementById('search-suggestion')
		var searchInput = document.getElementById('search-input')
		var closeButton = document.getElementById('close-icon')
		var searchSuggestionList = document.getElementsByClassName('search-suggestion-li')
		

		

		toggleMenuButton.addEventListener('click', function(event) {
					toggle.style.display = 'none';
					leftMenuBar.style.display = 'block'

					
		})

		toggleCloseButton.addEventListener('click', function(event) {
					toggle.style.display = 'none';
					leftMenuBar.style.display = 'block'

					
		})

    	window.addEventListener('mouseup', function(event) {
    			
    			
    		 		if( event.target != toggleMenu ) {
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
					
				} else {
					suggestionItems.style.display = 'none'
				}
			})

        
        })

        closeButton.addEventListener('click', function() {
        	searchInput.value = ""
        })