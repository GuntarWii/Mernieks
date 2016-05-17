
//Smooth scroll
(function () {
	function $(selector) {
		return document.querySelector(selector);
	}

	function $$(selector) {
		return document.querySelectorAll(selector);
	}

	var distance = 140,
		timeout = 30;


	function scrollingTime(curPos, sectionTop) {
		if (Math.abs(curPos - sectionTop) <= distance) {
			curPos = sectionTop;
		} else {
			var dir = (curPos > sectionTop) ? -distance : distance;
			curPos += dir;
			setTimeout(function () {
				scrollingTime(curPos, sectionTop)
			}, timeout);
		}
		window.scrollTo(0, curPos);

	}

	function navClick(e) {
		//nonemam defalto uzvedibu
		e.preventDefault()
		var curPos = window.pageYOffset, // pšreizejā pozicija kas noskrolēta no augšas
			//Dabūjam nospiestā element href
			href = this.getAttribute("href"),
			//Uzinam sekcijas pozīciju
			sectionTop = $(href).offsetTop;
		// uz klikšķa palaizam funkciju un padodam tai parametrus
		scrollingTime(curPos, sectionTop)
	}
	//dabujam visus linkus
	var links = $$(".js-nav-item");
	//izejam tiem visiem cauri
	for (var i = 0; i < links.length; i++) {
		//un pievienojam clcik eventu lai palaiz funkciju
		links[i].addEventListener("click", navClick);
	}

	window.onscroll = function () {
		arrowFunction()
	}

	function arrowFunction() {
		if (window.pageYOffset > window.innerHeight) {
			document.getElementById("xx").classList.remove("hidden");
			console.log("hidden")
		} else {
			document.getElementById("xx").classList.add("hidden");
			console.log("non hiden")
			console.log(window.pageYOffset)
		}
	}


})();



//Vlaidation
(function () {
	function $(selector) {
		return document.querySelector(selector);
	}

	function $$(selector) {
		return document.querySelectorAll(selector);
	}


	// Izasuc validācijas funkciju
	document.getElementById('email-form').onclick = function () {
		//Piešķir mainigjiem vērtību no inputiem	
		var name = $('#name').value,
			email = $('#email').value,
			message = $('#message').value;

		// Objekta vērtības priekš validācijas	
		var fields = {
			name: undefined,
			email: undefined,
			message: undefined
		};
		// Glabājās vissi errori
		var errorHolder = {};

		// Error messages	
		var errorMsg = {
			empty: "cannot be empty",
			notvalid: "is not valid"

		};

		// Vertibu piešķiršana īpašībām kas atrodās ---filds--- Objektā	
		var setFunction = {
				setName: function (name) {
					fields.name = name;
				},
				setEmail: function (email) {
					fields.email = email;
				},
				setMessage: function (message) {
					fields.message = message;
				}
			}
			//Izasauc funkcijas priekš piešķiršanas
		setFunction.setName(name);
		setFunction.setEmail(email);
		setFunction.setMessage(message);


		// Izejam cauri filds objekta īpašibām	
		for (var f in fields) {
			//parbauda vai nav tukš
			if (fields[f].trim() == "") {
				// Pevieno errorus errorHolder objektā un pieliek īpašībai īpašību no errorMsg
				errorHolder[f] = f + ": " + errorMsg.empty;
			}
		}

		//Emaila parbaude

		var atpos = fields.email.indexOf("@"); //mekle simbolu @
		var dotpos = fields.email.lastIndexOf("."); //mekle simbolu .
		//Pārbauda vai email forma ir šadi elementi ja
		if (!errorHolder.email) {
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= fields.email.length) {
				// Ja elementi atrasti tad pievienot tos errorHolder objektā
				errorHolder.email = "email: " + errorMsg.notvalid;
			}
		}

		var errorlenght = Object.keys(errorHolder).length;


		if (errorlenght) {
			printErrorMsg();
		} else {
			printAcceptMsg();
		}

		function printErrorMsg() {
			document.querySelector(".js-email-msg").innerHTML = '';
			for (var e in errorHolder) {
				var node = document.createElement("li");
				var textnode = document.createTextNode(errorHolder[e]);
				node.appendChild(textnode);
				$(".js-email-msg").appendChild(node);
				$(".js-email-msg").classList.remove("nonactive");

			}
		}

		function printAcceptMsg() {
			$(".js-email-msg").innerHTML = '';
			$(".js-email-msg").innerHTML = '<li>Message has been sent</li>';
		}


	}
})();



//Slider

(function () {


	function $(e) {
		return document.querySelector(e);
	}

	function $$(e) {
		return document.querySelectorAll(e);
	}


	var sliderItems = $$(".itemSlide"),
		sliderNext = $(".next"),
		sliderPrew = $(".prew"),
		sliderBtn = [],
		itemCount = sliderItems.length,
		activeItemIndx = 0;

	//Priekš elementa izvides
	var sliderNavigation = $(".silder-navigation");
	//Pievienjama klasi active pirmajam SliderItem
//	sliderItems[0].classList.add("active");
	// Dabūt aktīvā elementa index'u priekš slider itema un paginātora
	for (i = 0; i < itemCount; i++) {
		
		// Tai pašaā ciklā izvidojam paginātorus
		var newButton = document.createElement("button");
		sliderNavigation.appendChild(newButton);
		newButton.classList.add("paginator-btn");
		sliderBtn.push(newButton);
		
		if (sliderItems[i].classList.contains("active")) {
			//Elementa indeks kurs ir aktivs
			activeItemIndx = i;
			newButton.classList.add("active-nav")
		};

	}


//	//Atrkarojas silder baton ja var pievienot jau aukstak
//	sliderBtn[0].classList.add("active-nav");


	// funkcija katrai pogai pieliks onclick event
	sliderNext.onclick = carouselEvent;
	sliderPrew.onclick = carouselEvent;

	//Paginator pogas navigācija

	for (var i = 0, len = sliderBtn.length; i < len; i++) {

		sliderBtn[i].onclick = function () {
			activeItemIndx = sliderBtn.indexOf(this);
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
//	setInterval(carouselEvent, speed);

	// pievienot un noņemt activ klasi
	function addRemove() {
		for (var i = 0; i < itemCount; i++) {
			sliderItems[i].classList.remove("active")
			sliderBtn[i].classList.remove("active-nav")

		}
		sliderItems[activeItemIndx].classList.add("active")
		sliderBtn[activeItemIndx].classList.add("active-nav")
	}




//Clouser

})();