var filepath = "https://raw.githubusercontent.com/nekomix/dummy/main/_performance_HKV_compact.csv";

// --------------------------------------------------------

function create_link_item(dtype, key, lbl) {
  tmp_a = "";

  if (dtype=="YT") {
    tmp_a += '<a target="_blank" href="' + "https://www.youtube.com/channel/";
    tmp_a += (key) + '">' + lbl + "</a>";

  } else if (dtype=="video") {
    tmp_a += '<a target="_blank" href="' + "https://youtu.be/";
    //     tmp_a += '<a target="_blank" href="' + "";
    tmp_a += (key) + '">' + lbl + "</a>";
  }

  return(tmp_a);
}


function create_td_item(content) {
  tmp_td = "<td>" + (content) + "</td>"
  return(tmp_td);
}

function create_img_item(img_id) {
  tmp_img = "";
  tmp_img += '<img class="thumbnail" src="https://i.ytimg.com/vi/' + (img_id) + '/mqdefault.jpg" width= "150cm" loading="lazy" />';

  return(tmp_img);
}

// --------------------------------------------------------

var parseDate = d3.timeFormat("%Y-%m-%d");

var items = [];
var filteredItems = [];
var cutoffDate;
// --------------------------------------------------------

d3.csv(filepath).then(function (data) {
  items = data;
  var button = d3.select("#button");
  var form = d3.select("#form");
  button.on("click", runEnter);
  form.on("submit", runEnter);
  // Defining the function
  function runEnter() {

    d3.select("tbody").html("") 
    d3.event.preventDefault(); 

    var inputValue = d3.select("#user-input").property("value");

    if (inputValue=="") { return(null);}
    
    cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);

    var filteredItems = [];
    if (window.location.search.substr(1)==="recent") {
      // items.filter(items => (new Date(items["publish_date"]) > new Date("2022-07-08")));
      // var filteredItems = items.filter(items => (new Date(items["publish_date"]) > cutoffDate));
      var filteredItems = items.filter(
        items => (new Date(items["publish_date"]) > cutoffDate && items["title"].includes(inputValue)));
    } else if (window.location.search.substr(1)==="official") {
      var filteredItems = items.filter(
        items => (items["official"]==1 && items["title"].includes(inputValue)));
      
    } else {
      var filteredItems = items.filter(items => items["title"].includes(inputValue)); 
    }


    // var output = _.sortBy(xxxxxxxxxxxxxx, "avg_vote").reverse()
    var output = filteredItems;
    for (var i = 0; i < filteredItems.length; i++) {
      d3.select("tbody").insert("tr").html(
        create_td_item( [i+1] ) +

        // videoId,title,lengthSeconds,channelId,author,keywords,publish_date,official
        create_td_item( create_img_item(output[i]["thumbnail"]) ) +
        create_td_item( output[i]["title"] ) +
        create_td_item( create_link_item("video", output[i]["videoId"], "傳送門") ) +
        create_td_item( output[i]["author"] ) +
        create_td_item( create_link_item("YT", output[i]["channelId"], "頻道") ) +
        create_td_item( output[i]["publish_date"] )
        // create_td_item( output[i]["official"] )
      )

    }

  };
});
