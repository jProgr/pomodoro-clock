//
// Clock logic
//

// In  seconds
var clock =
{   
    session_time: 1500,
    break_time: 300,
    current_timer: 1500,
    inSession: true,
    ticking: false,
    substract_break: function() { this.break_time -= (this.break_time <= 60) ? 0 : 60; },
    add_break: function() { this.break_time += 60; },
    substract_session: function() { this.session_time -= (this.session_time <= 60) ? 0 : 60; },
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

//
// UI functions
//

function update_config_timers()
{
    $("#break_time").text(full_seconds_to_minutes_int(clock.break_time));
    $("#session_time").text(full_seconds_to_minutes_int(clock.session_time));
}

function update_main_clock()
{
    $("#timer").text(s_to_m(clock.current_timer));
}

// Converts seconds to string in the form of "mm:ss"
function s_to_m(seconds)
{   
    const minutes = ~~(seconds / 60);                                   // ~~: Math.floor()
    const r_seconds = seconds - minutes * 60;
    
    function str_pad_left(string,pad,length) { return (new Array(length+1).join(pad)+string).slice(-length); }
    
    return str_pad_left(minutes,'0',2) + ':' + str_pad_left(r_seconds,'0',2);
}

// Converts full minutes in seconds to minutes: 180 -> 3
function full_seconds_to_minutes_int(seconds) { return ~~(seconds / 60) + ""; }

setInterval(() => { update(); update_main_clock(); }, 1000);

$(document).ready(function()
{
    // On +, - press
    $("#substract_break").on("click", () => { clock.substract_break(); update_config_timers(); });
    $("#add_break").on("click", () => { clock.add_break(); update_config_timers(); });
    $("#substract_session").on("click", () => { clock.substract_session(); update_config_timers(); });
    $("#add_session").on("click", () => { clock.add_session(); update_config_timers(); });
    
    // Start timer
    $("#timer").on("click", () => {clock.toggle()});
});
