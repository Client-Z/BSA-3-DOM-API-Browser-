function sortByTag(tags) {

	var suitableArticleByTag = [];
	var mustDelete = 0;
	for (var i = 0; i < arrArticles.length; i++) {
		for (var j = 0; j < arrArticles[i].tags.length; j++) {
			if (tags.indexOf(arrArticles[i].tags[j]) != -1) {
				suitableArticleByTag.push(arrArticles[i]);
				mustDelete = 1;
				break;
			}
		}
		if (mustDelete) {
			mustDelete = 0;
			arrArticles.splice(i, 1);
		}
	}
	
	suitableArticleByTag.sort(function(a, b) {
		var countA = 0, countB = 0;

		for (var i = 0; i < tags.length; i++) {
			for (var j = 0; j < a.tags.length; j++) {
				if (tags[i] == a.tags[j]) {
					countA++;
				}
			}
			for (var k = 0; k < b.tags.length; k++) {
				if (tags[i] == b.tags[k]) {
					countB++;
				}
			}
		}
		return countB - countA;
	});
	console.log(suitableArticleByTag.concat(arrArticles));
	return suitableArticleByTag.concat(arrArticles);
}