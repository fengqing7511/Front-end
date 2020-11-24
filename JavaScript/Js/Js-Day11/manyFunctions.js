function   getId(id) {
	return document.getElementById(id);
}

function  setInnerText(element,text){
	if(typeof  element.textContent=="undefined"){
		element.innerText=text;
	}else{
		element.textContent = text;
	}
}
