(function () {


	function $(e) {
		return document.querySelector(e);
	}

	function $$(e) {
		return document.querySelectorAll(e);
	}


	var speed = 5000;


	var sliderItems = $$(".itemSlide"),
		sliderNext = $(".next"),
		sliderPrew = $(".prew"),
		itemCount = sliderItems.length,
		activeItemIndx;

	//Priekš elementa izvides
	var sliderNavigation = $(".silder-navigation");
	//Pievienjama klasi active pirmajam SliderItem
	sliderItems[0].classList.add("active");
	// Dabūt aktīvā elementa index'u priekš slider itema un paginātora
	for (i = 0; i < itemCount; i++) {
		if (sliderItems[i].classList.contains("active")) {
			//Elementa indeks kurs ir aktivs
			activeItemIndx = i;
		};
		// Tai pašaā ciklā izvidojam paginātorus
		var newButton = document.createElement("button");
		sliderNavigation.appendChild(newButton);
		newButton.classList.add("paginator-btn")
	}
	
	
	// optimizēt kodu lai nekas neatkartotos------------------------------------------------
	//-------------------|------------------
	//-------------------|------------------
	//-------------------|------------------
	//-------------------V------------------
	
	//Pievienojam klasi active primajam paginator'am
	
	//Atrkarojas silder baton ja var pievienot jau aukstak
	var sliderBtn = $$(".paginator-btn");
	sliderBtn[0].classList.add("active-nav");


	// funkcija katrai pogai pieliks onclick event
	sliderNext.onclick = carouselEvent;
	sliderPrew.onclick = carouselEvent;


	// optimizēt kodu lai nekas neatkartotos------------------------------------------------
	//-------------------|------------------
	//-------------------|------------------
	//-------------------|------------------
	//-------------------V------------------
	var sliderNavigation = $(".silder-navigation");
	//Paginator pogas navigācija
	for (var i = 0, len = sliderNavigation.children.length; i < len; i++) {

			sliderNavigation.children[i].onclick = function () {
				activeItemIndx = i;
				addRemove();


			}

	}


	//Notikumu priekš slaidera
	function carouselEvent() {
		if (this == sliderNext) {
			activeItemIndx += 1
			if (activeItemIndx >= itemCount) {
				activeItemIndx -= itemCount
			}
		} else if (this == sliderPrew) {
			activeItemIndx -= 1
			if (activeItemIndx <= -1) {
				activeItemIndx += itemCount
			}
		} else {
			activeItemIndx += 1
			if (activeItemIndx >= itemCount) {
				activeItemIndx -= itemCount
			}
		}
		addRemove()
		console.log(activeItemIndx)
	}
	// Auto sliders
	
	// Dekativizet silder intervbalu
	// optimizēt kodu lai nekas neatkartotos------------------------------------------------
	//-------------------|------------------
	//-------------------|------------------
	//-------------------|------------------
	//-------------------V------------------
	setInterval(carouselEvent, speed);

	// pievienot un noņemt activ klasi
	function addRemove() {
		for (var i = 0; i < itemCount; i++) {
			sliderItems[i].classList.remove("active")
			sliderBtn[i].classList.remove("active-nav")

		}
		sliderItems[activeItemIndx].classList.add("active")
		sliderBtn[activeItemIndx].classList.add("active-nav")
	}