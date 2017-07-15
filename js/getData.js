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

	// если будет время, перенести проверку в ф-ю renderTagsForm
	if(!localStorage.tags){
		renderTagsForm();
		toggleCheckbox();
		
		arrArticles.sort(function(a,b) { 
    		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});

		renderDatasPart = arrArticles.slice(segment, segment + 10);
		renderHTML(renderDatasPart);
		segment += 10;

	} else {
		var localTags = JSON.parse(localStorage.getItem("tags")) //спарсим его обратно объект
		var tagsForRender = sortByTag(localTags);  // передать выбранные теги из хранилища в ф-ю сортировки по тегам	
		renderHTML(tagsForRender);
	} 

	

	
	deleteHandler(); // kind of dependency injection. Должна быть обязательно после ф-ии renderHTML.


	console.log(arrArticles);
}
xhr.open('GET', 'https://api.myjson.com/bins/152f9j', true);
xhr.send( );

