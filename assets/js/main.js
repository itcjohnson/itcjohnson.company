let jeans = 0;
let clothesList = ["shirt", "jeans"];
let cloth = clothesList[jeans];
let page = 1;
let total = [22, 26];
let totalpages = [0, 0];
const N = 6;
let titles = [];

function stateChange(j, p) {
	page = p;
	jeans = j;
	cloth = clothesList[j];
}

function addPageNumbers() {
	$("#pagenumberlist").empty();
	for (let i = 1; i <= totalpages[jeans]; i++) {
		$("#pagenumberlist").append('<li class="page-item" id="button-' + i + '"><a class="page-link">' + i + '</a></li>');
	}
}

function addElements() {
	$("#catalog-list").empty();
	let tot = N;
	if (page == totalpages[jeans])
		tot = (total[jeans] - 1) % N + 1;
	for (let i = 1; i <= tot; i++) {
		$("#catalog-list").append(`
      <div class="col-spc my-4">
        <div class="card card-shadow">
          <img src="assets/images/` + cloth + `/` + (i + (page - 1) * N) + `.jpg" class="card-image" id="my`+ i +`">
          <div class="spinner d-flex">
            <div class="spinner-border text-primary justify-content-center align-items-center"></div>
          </div>
          <div class="c-body justify-content-center">
            ` + titles[jeans][i + (page - 1) * N] + `
          </div>
        </div>
      </div>`);
		$("#my" + i).click(function() {
			$("#modal").show();
			$("#modal-img").attr('src', "assets/images/" + cloth + "-full/" + (i + ((page - 1) * N)) + ".jpg");
			$("#caption").html(titles[jeans][i + (page - 1) * N]);
		});
	}
}

function addActive() {
	$("#button-" + page).addClass('active');
}

function removeActive() {
	$("#button-" + page).removeClass('active');
}

function addOnClick(i) {
	$("#button-" + i).click(function() {
		let pi = page;
		removeActive();
		removeOnClick(i);
		stateChange(jeans, i);
		addActive();
		addOnClick(pi);

		addElements();
	});
}

function removeOnClick(i) {
	$("#button-" + i).off('click');
}

function addOnClickAll() {
	let tot = total[jeans];
	for (let i = 1; i <= totalpages[jeans]; i++) {
		if (page != i) {
			addOnClick(i);
		}
	}
}

function addActiveMain(){
	$("#" + jeans).addClass("active");
	$("#" + jeans).addClass("head-3");
}

function removeActiveMain() {
	$("#" + jeans).removeClass("active");
	$("#" + jeans).removeClass("head-3");
}

function removeOnClickMain(i) {
	$("#" + i).off('click');
}


function addOnClickMain(i) {
	$("#" + i).click(function() {
		removeActiveMain();
		removeOnClickMain(i);
		stateChange(i, 1);
		addActiveMain();
		addOnClickMain(1 - i);

		addPageNumbers();
		addActive();
		addOnClickAll();

		addElements();
	});
}

$("#modal-close").click(function(){
	$("#modal").hide();
});

$.getJSON("assets/js/data.json", function(data) {
	titles = data;
	total[0] = titles[0].length - 1;
	total[1] = titles[1].length - 1;
	totalpages[0] = Math.floor((total[0] + N - 1) / N);
	totalpages[1] = Math.floor((total[1] + N - 1) / N);
	console.log(total);
	console.log(totalpages);
	addPageNumbers();
	addActive();
	addOnClickAll();

	addElements();

	addActiveMain();
	addOnClickMain(1 - jeans);
});
