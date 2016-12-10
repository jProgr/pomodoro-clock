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
    
    // Toggles between Session timer and Break timer
    if (clock.current_timer <= 0 && !clock.inSession) { clock.current_timer = clock.break_time; clock.inSession = true; }
    else if (clock.current_timer <= 0 && clock.inSession) { clock.current_timer = clock.session_time; clock.inSession = false; }
}

setInterval(update, 1000);

function test() { console.log("hai"); }

$(document).ready(function()
{
    // On +, - press
    $("#substract_break").on("click",() => {clock.substract_break()});
    $("#add_break").on("click", () => {clock.add_break()});
    $("#substract_session").on("click", () => {clock.substract_session()});
    $("#add_session").on("click", () => {clock.add_session()});
    
    // Start timer
    $("#timer").on("click", () => {clock.toggle()});
});
