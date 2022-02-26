const todo = () => {
    var activity = document.getElementById("activity");
    var debug = document.getElementById("debug");
    var list = document.getElementById("list");
    const todoList = [];

    activity.addEventListener("keyup", function(event) {
        if(event.key === 'Enter'){
            var user_input = activity.value;
            if(user_input.length > 0) {
                console.log(user_input);
                console.log(user_input.length);
                activity.value = null;
                todoList.push(user_input);
                display_task(user_input);
            }
        }
    })

    function display_task(user_input) {
        console.log("trying to change");
        list.innerHTML +="<li><input type='checkbox'>" + user_input + "</li>";
    }

    debug.addEventListener('click', () =>{
        for(var i = 0; i < todoList.length; i++){
            console.log(todoList[i]);
        }
    })
}

todo();

