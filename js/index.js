$(document).ready(function() {
  // variables for tracking things
  var total = 0; // 13 digit max, not converting to scientific notation
  var history = [];
  var op = "";

  var calculate = function(ops) {
    if (ops.length < 3 || ops.length % 2 === 0) {
      return;
    }

    var i;
    var result = 0;

    // find operations, look for times and divided by
    for (i = ops.indexOf("*"); i !== -1; i = ops.indexOf("*")) {
      result = ops[i - 1] * ops[i + 1];
      ops.splice(i - 1, 3, result);
    }

    for (i = ops.indexOf("/"); i !== -1; i = ops.indexOf("/")) {
      result = ops[i - 1] / ops[i + 1];
      ops.splice(i - 1, 3, result);
    }

    for (i = ops.indexOf("+"); i !== -1; i = ops.indexOf("+")) {
      result = ops[i - 1] + ops[i + 1];
      ops.splice(i - 1, 3, result);
    }

    for (i = ops.indexOf("-"); i !== -1; i = ops.indexOf("-")) {
      result = ops[i - 1] - ops[i + 1];
      ops.splice(i - 1, 3, result);
    }

    return parseFloat(ops[0]);
  };

  var updateDisplay = function() {
    var val = op !== "" ? op : "0";
    $("#display").text(val);
  };

  var pushUnaryOperation = function(event) {
    if (op === "") return;
    switch (event.target.id) {
      case "ac":
        history = [];
        op = "";
        break;
      case "ce":
        op = "";
        break;
      case "dot":
        op += ".";
        break;
      case "equals":
        history.push(parseFloat(op));
        op = calculate(history);
        history = [];
        break;
    }
    updateDisplay();
  };

  var pushOperation = function(event) {
    if (op === "") return;
    switch (event.target.id) {
      case "plus":
        history.push(parseFloat(op));
        history.push("+");
        break;
      case "minus":
        history.push(parseFloat(op));
        history.push("-");
        break;
      case "times":
        history.push(parseFloat(op));
        history.push("*");
        break;
      case "divide":
        history.push(parseFloat(op));
        history.push("/");
        break;
    }
    op = "";
  };

  var pushOperand = function(event) {
    op += event.target.id;
    updateDisplay(op);
  };

  // ui
  var toggleDarkMode = function() {
    var container = $(".calculator");
    var dark_button = $("#dark");
    if (container.hasClass("dark")) {
      container.removeClass("dark");
      dark_button.html("D");
    } else {
      container.addClass("dark");
      dark_button.html("L");
    }
  };

  // events
  $(".unary-operation").click(pushUnaryOperation);
  $("#dark").click(toggleDarkMode);
  $(".operation").click(pushOperation);
  $(".operand").click(pushOperand);
});
