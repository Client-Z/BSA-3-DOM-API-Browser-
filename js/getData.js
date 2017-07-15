// Асинхронно получить данные в JSON
// Развернуть их в массив объектов
// Экспортировать

var arrArticles;
var segment = 0;

var xhr = new XMLHttpRequest();
xhr.onload = function(){
	articlesJSON = xhr.responseText;
	var articles_obj = JSON.parse(articlesJSON);
	arrArticles = articles_obj.data;

	var arrArticlesForRender = [];

	arrArticles.sort(function(a,b) { 
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

	if(!localStorage.tags){
		renderTagsForm();
		toggleCheckbox();
		arrArticlesForRender = arrArticles;
		renderDatasPart = arrArticlesForRender.slice(segment, segment + 10);
		renderHTML(renderDatasPart);
		segment += 10;

	} else {
		var localTags = JSON.parse(localStorage.getItem("tags")) //спарсим его обратно объект
		arrArticlesForRender = sortByTag(localTags);  // передать выбранные теги из хранилища в ф-ю сортировки по тегам

		arrArticlesForRender.concat(arrArticles);
		renderDatasPart = arrArticlesForRender.slice(segment, segment + 10);
		renderHTML(renderDatasPart);
	} 

	

	
	deleteHandler(); // kind of dependency injection. Должна быть обязательно после ф-ии renderHTML.


	console.log(arrArticles);
}
xhr.open('GET', 'https://api.myjson.com/bins/152f9j', true);
xhr.send( );

