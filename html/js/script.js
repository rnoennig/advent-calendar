var doorCount = 1;

function placeRelativePercentageDoor(door, left, top) {
    var bg = $('#bg');
    var doorOpenable = shouldBeOpenable(door);
    var hours = hoursUntilDoorDate(door);
    var doorEl = $('<div>')
        .addClass('door')
        .css({
            'left': left + '%',
            'top': top + '%'
        });
    var doorImgEl = $('<img>')
        .addClass('doorimg')
        .prop('src', '/img/doors/'+door+'.png');
    doorEl.append(doorImgEl);

    if (doorOpenable) {
        doorEl.addClass('open');
        doorImgEl.click(function(){
            openDoor(door);
        });
    } else {
        doorEl.addClass('closed');
    }
    if (hours > -24 && hours <= 0) {
        doorEl.addClass('today');
        var sparkle = $('<img>')
            .addClass('sparkle')
            .prop('src', '/img/sparkle3.gif');

        doorEl.append(sparkle);
        doorImgEl.addClass('animate__animated animate__pulse animate__infinite');
    }
    bg.append(doorEl);
}

function openDoor(day) {
    var query = '/cgi-bin/adventskalender?day='+day;
    var additionalQuery = window.location.href.split('?').slice(1).join('&');
    if (additionalQuery) {
        query += '&' + additionalQuery;
    }
    $.get(query)
        .done(function(data){
            if (data) {
                data = $.parseJSON(data);
                var text = data.text;
                var headline = "Tag " + day;
                var imgSrc = data.img;
                showDoor(text, headline, imgSrc);
            }
        })
        .fail(function(err){
            console.log('fail', err);
        });
}

function showDoor(text, headline, imgSrc) {
    var dialog = $("#dialog");
    dialog.hide();
    dialog.find('#text h1').text(headline);
	var paragraphs = text.split("\n\n");
	dialog.find('#text p').remove();
	for (var i=0; i<paragraphs.length; i++) {
		var paragraph = paragraphs[i];
		var paragraphEl = $('<p>');
		paragraphEl.text(paragraph);
		dialog.find('#text').append(paragraphEl);
	}
    if (imgSrc) {
        dialog.find('.img img').prop('src', "/img/days/" + imgSrc);
    } else {
        dialog.find('.img img').prop('src', '');
    }
    dialog.show();
    dialog.click(function(){
        dialog.hide();
    });
}

function shouldBeOpenable(day) {
    var hours = hoursUntilDoorDate(day);
    if (hours <= 0) {
        return true;
    }
    return false;
}

function hoursUntilDoorDate(day) {
    var now = new Date();
    var queryStartIndex = window.location.href.indexOf('?');
    if (queryStartIndex > -1) {
        var query = window.location.href.substr(queryStartIndex+1);
        var queryValueIndex = query.indexOf('=');
        if (queryValueIndex > -1) {
            var alternativeNow = decodeURI(query.substr(queryValueIndex+1));
            now = new Date(alternativeNow);
        }
    }

    // client-side date check
    var doorDate = new Date("2021/12/"+day);
    var hoursUntilDoorDate = (doorDate - now) / 1000 / 3600;
    return hoursUntilDoorDate;
};

$(function() {
    $('body').click(function(e){
        e.preventDefault();
        // enable when placing doors
        return;

        var x = e.originalEvent.clientX;
        var y = e.originalEvent.clientY;

        var bg = $('#bg');
        var bgWidth = bg.width();
        var bgHeight = bg.height();
        var imgScaleFactor = 0.05;
        x = x - bg.offset().left;
        y = y - bg.offset().top;
        x = x / bgWidth;
        y = y / bgHeight;
        x = x - (bgWidth * imgScaleFactor / 2) / bgWidth;
        y = y - (bgHeight * imgScaleFactor / 2) / bgHeight;
        x = x * 100;
        y = y * 100;
        placeRelativePercentageDoor(doorCount++, x, y);
        console.log('placeRelativePercentageDoor('+doorCount+','+x+', '+y+');');
    });

    placeRelativePercentageDoor(1, 56.649072296865, 20.378228782287824);
    placeRelativePercentageDoor(2, 9.752079334612922, 75.0830258302583);
    placeRelativePercentageDoor(3, 74.62731925783748, 88.18265682656826);
    placeRelativePercentageDoor(4, 19.349008317338452, 35.23062730627306);
    placeRelativePercentageDoor(5, 31.825015994881632, 77.11254612546125);
    placeRelativePercentageDoor(6, 56.71305182341651, 70.93173431734317);
    placeRelativePercentageDoor(7, 90.23832373640434, 47.130996309963095);
    placeRelativePercentageDoor(8, 46.924184261036466, 77.6660516605166);
    placeRelativePercentageDoor(9, 21.524312220089573, 71.48523985239852);
    placeRelativePercentageDoor(10, 37.39123480486244, 84.58487084870848);
    placeRelativePercentageDoor(11, 60.61580294305821, 38.367158671586715);
    placeRelativePercentageDoor(12, 11.351567498400511, 53.31180811808118);
    placeRelativePercentageDoor(13, 62.66314779270633, 81.7250922509225);
    placeRelativePercentageDoor(14, 73.66762635956493, 47.776752767527675);
    placeRelativePercentageDoor(15, 4.825655790147152, 80.9870848708487);
    placeRelativePercentageDoor(16, 37.71113243761996, 77.20479704797047);
    placeRelativePercentageDoor(17, 50.57101727447216, 68.34870848708486);
    placeRelativePercentageDoor(18, 70.85252719129879, 67.05719557195572);
    placeRelativePercentageDoor(19, 17.237683941138837, 90.48892988929889);
    placeRelativePercentageDoor(20, 63.366922584772865, 57.27859778597786);
    placeRelativePercentageDoor(21, 93.62923864363404, 69.82472324723247);
    placeRelativePercentageDoor(22, 30.09756877799104, 90.95018450184502);
    placeRelativePercentageDoor(23, 64.07069737683942, 30.249077490774905);
    placeRelativePercentageDoor(24, 50.187140115163146, 90.58118081180811);
});
