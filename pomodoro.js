// In  seconds
var clock =
{   
    session_time: 1500,
    break_time: 300,
    main_clock: 1500,
    current_timer: 1500,
    inSession: true,
    ticking: false,
    substract_break: function() { this.break_time -= 60; },
    add_break: function() { this.break_time += 60; },
    substract_session: function() { this.session_time -= 60; },
    add_session: function() { this.session_time += 60; },
    toggle: function() { this.ticking = !this.ticking; }
};

function update()
{
    if (clock.current_timer > 0 && clock.ticking) { clock.current_timer--; }
    
    if (clock.current_timer <= 0 && !clock.inSession) { clock.current_timer = clock.break_time; clock.inSession = true; }
    else if (clock.current_timer <= 0 && clock.inSession) { clock.current_timer = clock.session_time; clock.inSession = false; }
    
    // console.log(clock.current_timer);
}

setInterval(update, 1000);

/*$(document).ready(function()
{
    // On +, - press
    $("#substract_break").on("click", clock.substract_break);
    $("#add_break").on("click", clock.add_break);
    $("#substract_session").on("click", clock.substract_session);
    $("#add_session").on("click", clock.add_session);
    
    // Start timer
    $("#main_clock").on("click", clock.toggle);
});*/



/*
var Person = function (firstAndLast)
{
    var f_name = firstAndLast;
    
    function change_first(newname) { f_name = newname + " " + f_name.split(" ")[1]; }
    function change_last(newname) { f_name = f_name.split(" ")[0] + " " + newname; }
    
    this.getFullName = function() { return f_name; };
    this.setFullName = function(name) { f_name = name; };
    this.getFirstName = function() { return f_name.split(" ")[0]; };
    this.setFirstName = function(name) { change_first(name); };
    this.getLastName = function() { return f_name.split(" ")[1]; };
    this.setLastName = function(name) { change_last(name); };
};
*/
