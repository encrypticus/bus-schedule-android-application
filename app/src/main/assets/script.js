window.onload = function () {
  var date,
    current_hour,
    current_min,
    current_time,
    to_village_cells = document.querySelectorAll(".town"),
    to_town_cells = document.querySelectorAll(".village"),
    to_village_length = to_village_cells.length,
    to_town_length = to_town_cells.length,
    to_village_str = '',
    to_town_str = '',
    to_village_array,
    to_town_array,
    to_village_bus = 'завтра в 6:05',
    to_town_bus = 'завтра в 6:15',
    //town_pattern = new RegExp("\\s" + current_hour + ":" + "\\d\\d", "g"),
    from_town_btn = $("#from_town_btn"),
    from_village_btn = $('#from_village_btn');

  function getTime() {
    date = new Date();
    current_hour = date.getHours();
    current_min = ((date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes());
    current_time = current_hour + ":" + current_min;
  }

  getTime();

  for (var i = 0; i < to_village_length; i++) {
    to_village_str += " " + to_village_cells[i].textContent;
  }

  to_village_str = to_village_str.trim();
  to_village_array = to_village_str.split(" ");

  function getToVillageBus() {
    for (var i = 0; i < to_village_array.length; i++) {
      var temp_to_village_time = Number(current_time.replace(/:/, "")),
        temp_to_village_value = Number(to_village_array[i].replace(/:/, ""));
      //console.log("time = " + temp_time + " value = " + temp_value + " " + (temp_time < temp_value));
      if (temp_to_village_time < temp_to_village_value) {
        to_village_bus = to_village_array[i];
        break;
      }
    }
  }

  getToVillageBus();

  for (var i = 0; i < to_town_length; i++) {
    to_town_str += " " + to_town_cells[i].textContent;
  }

  to_town_str = to_town_str.trim();
  to_town_array = to_town_str.split(" ");

  function getToTownBus() {
    for (var i = 0; i < to_town_array.length; i++) {
      var temp_to_town_time = Number(current_time.replace(/:/, "")),
        temp_to_town_value = Number(to_town_array[i].replace(/:/, ""));
      //console.log("time = " + temp_time + " value = " + temp_value + " " + (temp_time < temp_value));
      if (temp_to_town_time < temp_to_town_value) {
        to_town_bus = to_town_array[i];
        break;
      }
    }
  }

  getToTownBus();


  function Notification(options) {
    options = options || {};
    var pos = options.pos || {x: "7%", y: "20px"},
      direction = options.direction || "left",
      b_color = options.b_color || "blue",
      element = $("<div>"/*, {
       click: function () {
       $(this).hide("drop", {direction: direction}, "normal");
       }
       }*/).css({
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: "80%",
        display: "none",
        color: "yellow",
        backgroundColor: b_color,
        borderRadius: "10px",
        padding: "10px",
        fontSize: "larger",
        boxShadow: "-10px 10px 50px gray"
      }).appendTo("body").text(options.text).on("touchstart", function () {
        $(this).hide("drop", {direction: direction}, "normal");
      });

    this.show = function () {
      setTimeout(function () {
        element.show("drop", {direction: direction}, "normal");
      }, 500);
    };

    this.showFast = function () {
      element.css({left: "7%", top: "20px"});
      element.show("drop", {direction: direction}, "normal");
    };

    this.getElement = function () {
      return element;
    };
  };

  var from_town_note = new Notification({
    text: "Сейчас " + current_time + "\n" + "Ближайший рейс из города " + to_village_bus,
    pos: {x: "7%", y: "150px"}
  });

  from_town_note.show();

  from_town_btn.on("touchstart", function () {
    getTime();
    to_village_bus = 'завтра в 6:05';
    getToVillageBus();
    from_town_note.getElement().text("Сейчас " + current_time + "\n" + "Ближайший рейс из города " + to_village_bus);
    from_town_note.showFast();
  });

  var from_village_note = new Notification({
    text: "Сейчас " + current_time + "\n" + "Ближайший рейс из поселка " + to_town_bus,
    direction: "right",
    b_color: "green"
  });

  from_village_note.show();

  from_village_btn.on("touchstart", function () {
    getTime();
    to_town_bus = 'завтра в 6:15'
    getToTownBus();
    from_village_note.getElement().text("Сейчас " + current_time + "\n" + "Ближайший рейс из поселка " + to_town_bus);
    from_village_note.showFast();
  });

};

