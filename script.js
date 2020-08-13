$('body').scrollspy({ target: '#list-example' })

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getAllRecords = function () {
    $.getJSON(
        "https://api.airtable.com/v0/appsO0HxAALW5nhV4/plantInfo?api_key=key8tBDjVn91KtW2a&view=newView",
        function (airtable) {
            var listViewHTML = [];
            var listGroupHTML = [];
            //var pictures = [];

            $.each(airtable.records, function (index, record) {
                var id = record.id;
                var picture = record.fields["Picture"];
                var name = record.fields["Names"];
                var location = record.fields["Location"];
                listViewHTML.push(listView(id, name, picture, location));
                listGroupHTML.push(listGroup(id, name));
                // pictures.push(justPics(picture));
            });
            $(".list-view").append(listViewHTML);
            //$(".card-title").append(listViewHTML);
            // $(".activator").append(pictures);
            $(".list-group").append(listGroupHTML);

        }
    );
};

// NEED TO CHANGE, IVAN'S CODE
var getOneRecord = function (id) {
    $.getJSON(
        `https://api.airtable.com/v0/appsO0HxAALW5nhV4/plantInfo/${id}?api_key=key8tBDjVn91KtW2a`,
        function (record) {
            var html = [];
            var picture = record.fields["Picture"];
            var name = record.fields["Names"];
            var location = record.fields["Location"];
            var facts = record.fields["Facts"];
            var temp = record.fields["Temp"];
            var sun = record.fields["Sun"];
            
            html.push(detailView(picture, name, location, facts, temp, sun));
            $(".detail-view").append(html);
        }
    );
};

//    <img src="${picture[0].url}">

var listView = function (id, name, picture, location) {
    return `
    <div class="list-border">
    <h4 id="${id}">${name}</h4>
    <a href="plantInfo.html?id=${id}">
        ${picture ? `<img src="${picture[0].url}">` : ``}
    </a>
    <p> Indoor / Outdoor: ${location}</p>
    `;
};
var listGroup = function (id, name) {
    return `
    <a class="list-group-item list-group-item-action" href="#${id}">${name}</a>
    </div>
    `;
};



//NEED TO CHANGE, IVAN'S CODE
var detailView = function (picture, name, location, facts, temp, sun) {
    return `
    <div class="card mt-5" style="max-width: 63em; height: 30em;">
        <div class="row no-gutters">
            <div class="col-md-4 card-img-top ">
                ${picture ? `<img src="${picture[0].url}">` : ``}
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 style=" font-family: 'Inconsolata', monospace; font-size:2.5em; font-weight:700;"class="card-title">${name}</h5>
                <p class="card-text">${facts}</p>
                <p class="card-text"> <h5 style=" font-size:.93em; font-weight:640;" >Suitable Temerature: </h5>${temp}</p>
                <p class="card-text"> <h5 style="font-size:.93em; font-weight:640;" >Sun: </h5>${sun}</p>
                <p class="card-text"><small class="text-muted"> <strong>Indoor / Outdoor:</strong> ${location}</small></p>
                </div>
            </div>
        </div>
  </div>
    `;
};


var id = getParameterByName("id");
if (id) {
    getOneRecord(id);
} else {
    getAllRecords();
}