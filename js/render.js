/*var sort = require('sortByTagName');
var funcSort = sort.sortByTags;		// получаем ф-ю сортировки по тегам
*/

function renderHTML(articles) {
	var container = document.getElementById("container");

	articles.map(function(data){
		var articleBox = document.createElement("div");
		articleBox.classList.add('article-box');
		var title = document.createElement("h3");
		title.classList.add('title');
		var image = document.createElement("img");
		image.classList.add('article-image');
		var description = document.createElement("p");
		description.classList.add('description');
		var createdAt = document.createElement("span");
		createdAt.classList.add('createdAt');
		var tagsBox = document.createElement("div");
		tagsBox.classList.add('tags-box');
		var btnDelete = document.createElement("div");
		btnDelete.classList.add('btnDelete');

		title.textContent = data.title;
		image.src = data.image;
		description.textContent = data.description;
		createdAt.textContent = typeDate(data.createdAt);
		tagsBox.innerHTML = data.tags.join(' | ');
		btnDelete.textContent = "Delete";

		articleBox.appendChild(title);
		articleBox.appendChild(image);
		articleBox.appendChild(description);
		articleBox.appendChild(createdAt);
		articleBox.appendChild(tagsBox);
		articleBox.appendChild(btnDelete);

		container.appendChild(articleBox);
	});
}

function typeDate(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July",
    				"August", "September", "October", "November", "December" ];

    var createdAt = new Date(date);
    var day = createdAt.getDate();
    var monthIndex = createdAt.getMonth();
    var year = createdAt.getFullYear();
    var n = createdAt.toLocaleTimeString();

	return day + ' ' + monthNames[monthIndex] + ' ' + ', ' + year + ' Y , at ' + n;
}

function deleteHandler() {
	var btnDelete = document.querySelectorAll(".btnDelete");

	for (var i = 0; i < btnDelete.length; i++) {
		btnDelete[i].addEventListener("click", function () {
			var nodeTitle = this.parentNode.firstChild.textContent;
			for (var i = 0; i < arrArticles.length; i++) {
				if(arrArticles[i].title == nodeTitle) {
					arrArticles.splice(arrArticles[i], 1);
					var boxDelete = this.parentNode;
					boxDelete.parentNode.removeChild(boxDelete);
				}
			}
		});
	}
}

function renderTagsForm() {
	var tags = [];

	for (var i = 0; i < arrArticles.length; i++) {
		for (var j = 0; j < arrArticles[i].tags.length; j++) {
			if (tags.indexOf(arrArticles[i].tags[j]) == -1) {
				tags.push(arrArticles[i].tags[j]);
			}
		}
	}

	var tagForm = document.getElementById("tag-chooser");

	for (var i = 0; i < tags.length; i++) {
		var checkbox = document.createElement("input");
	    	checkbox.type = "checkbox";
	    	checkbox.value = tags[i];
			checkbox.id = tags[i];
			checkbox.classList.add('check-tag');

		var label = document.createElement('label')
			label.htmlFor = tags[i];
			label.appendChild(document.createTextNode(tags[i]));

			tagForm.appendChild(checkbox);
			tagForm.appendChild(label);

	}
	console.log(tags);
}

function toggleCheckbox() {
	var checkboxes = document.getElementsByClassName("check-tag");
	

	var checkedTags = [];
	console.log(checkedTags);

	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener("click", function () {
			if (checkedTags.indexOf(this.value) == -1) {
				checkedTags.push(this.value);
				console.log(checkedTags);
			}
			var serialCheckedTags = JSON.stringify(checkedTags); //сериализуем его
 			localStorage.setItem("tags", serialCheckedTags); //запишем его в хранилище по ключ
 			var renderArticles = sortByTag(checkedTags);
 			document.getElementById("container").innerHTML = '';
			renderHTML(renderArticles);
		});
	}
}

function sortByTag(tags) {
	var suitableArticleByTag = [];
	var mustDelete = 0;
	for (var i = 0; i < arrArticles.length; i++) {
		for (var j = 0; j < arrArticles[i].tags.length; j++) {
			if (tags.indexOf(arrArticles[i].tags[j]) != -1) {
				suitableArticleByTag.push(arrArticles[i]);
				mustDelete = 1;
			}
		}
		if (mustDelete) {
			mustDelete = 0;
			arrArticles.splice(i, 1);
		}
	}
	
	suitableArticleByTag.sort(function(a,b) { 
		return a.tags.length - b.tags.length;
	});
	console.log(suitableArticleByTag);
	return suitableArticleByTag;

}

function clearContainer() {
	document.getElementById("container").innerHTML = '';
}