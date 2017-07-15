var searchInput = document.getElementById('search');

searchInput.addEventListener("input", function() {

	if(searchInput.value.length >= 2){
		document.getElementById("container").innerHTML = '';
		var arrForRender = [];
		for (var i = 0; i < arrArticles.length; i++) {
			if(arrArticles[i].title.indexOf(searchInput.value) + 1) {
				arrForRender.push(arrArticles[i]);
			}
		}
		renderHTML(arrForRender);
	}

	if(searchInput.value.length <= 1){
		document.getElementById("container").innerHTML = '';
		renderDatasPart = arrArticles.slice(0, segment + 10);
		renderHTML(renderDatasPart);
	}
});


