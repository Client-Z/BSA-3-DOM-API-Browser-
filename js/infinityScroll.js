window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
		renderDatasPart = arrArticlesForRender.slice(segment, segment + 10);
		renderHTML(renderDatasPart);
		segment += 10;
    }
    deleteHandler();
};