var filepath = "https://raw.githubusercontent.com/nekomix/dummy/main/_performance_HKV_compact.csv?202207290152";

// --------------------------------------------------------

function create_link_item(dtype, key, lbl) {
  tmp_a = "";

  if (dtype=="YT") {
    tmp_a += '<a target="_blank" href="' + "https://www.youtube.com/channel/";
    tmp_a += (key) + '">' + lbl + "</a>";

  } else if (dtype=="video") {
    //     tmp_a += '<a target="_blank" href="' + "https://youtu.be/";
    //     //     tmp_a += '<a target="_blank" href="' + "";
    //     tmp_a += (key) + '">' + lbl + "</a>";
    
    tmp_a += '<a target="_blank" href="' + "https://youtu.be/" + (key) + '">';
    tmp_a += '<i class="material-icons">meeting_room</i>'
    tmp_a += "</a>";
  }

  return(tmp_a);
}


function create_td_item(content) {
  tmp_td = "<td>" + (content) + "</td>";
  return(tmp_td);
}

function create_td_multi_item(content1, content2) {
  tmp_td = "<td>" + (content1) + (content2) + "</td>";
  return(tmp_td);
}

function create_img_item(img_id) {
  tmp_img = "";
  tmp_img += '<img class="thumbnail" src="https://i.ytimg.com/vi/' + (img_id) + '/mqdefault.jpg" width= "150cm" loading="lazy" />';

  return(tmp_img);
}

function create_title_item(content) {
  tmp_td = '<div class="overflow_text">' + content + '</div>';
  return(tmp_td)
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

    filteredItems = [];
    if (window.location.search.substr(1)==="recent") {
      filteredItems = items.filter(items => (new Date(items["publish_date"]) > cutoffDate));
      
    } else if (window.location.search.substr(1)==="official") {
      filteredItems = items.filter(items => (items["official"]==1));
      
    } else {
      filteredItems = items;
    }
    
    // ---------------------------------------------------------------------------------------------------------------
    
    // filteredItems = filteredItems.filter(items => items["title"].toLowerCase().includes(inputValue.toLowerCase())); 
    filteredItems = filteredItems.filter(
      items => items["title"].toLowerCase().includes(inputValue.toLowerCase()) || 
        items["author"].toLowerCase().includes(inputValue.toLowerCase()) ); 

    // ---------------------------------------------------------------------------------------------------------------
    
    filteredItems = filteredItems.sort((a, b) => new Date(a["publish_date"]) < new Date(b["publish_date"]) ? 1 : -1);
    document.querySelector("#result_count").textContent = filteredItems.length;
    
    // var output = _.sortBy(xxxxxxxxxxxxxx, "avg_vote").reverse()
    var output = filteredItems;
    for (var i = 0; i < output.length; i++) {
      d3.select("tbody").insert("tr").html(
        // create_td_item( [i+1] ) +

        // videoId,title,lengthSeconds,channelId,author,keywords,publish_date,official
        create_td_item( create_img_item(output[i]["thumbnail"]) ) +
        //         create_td_item( create_title_item(output[i]["title"]) ) +
        //         create_td_item( create_link_item("video", output[i]["videoId"], "傳送門") ) +

        create_td_multi_item( 
          create_link_item("video", output[i]["videoId"], "傳送門") +
          create_title_item(output[i]["title"]) ) +

        create_td_item( output[i]["author"] ) +
        create_td_item( create_link_item("YT", output[i]["channelId"], "頻道") ) +
        create_td_item( output[i]["publish_date"] )
        // create_td_item( output[i]["official"] )
      )

    }

  };
});
