const todo = () => {
    var activity = document.getElementById("activity");
    var debug = document.getElementById("debug");
    var list = document.getElementById("list");
    const todoList = [];

    activity.addEventListener("keyup", function(event) {
        if(event.key === 'Enter'){
            var user_input = activity.value;
            if(user_input.length > 0) {
                activity.value = null;
                todoList.push(user_input);
                display_task(user_input, todoList.length - 1);
            }
        }
    })

    function display_task(user_input, id) {
        console.log("trying to change");
        list.innerHTML +="<li id='" + id +"'><input type='checkbox'>" + user_input + "</li>";
    }

    debug.addEventListener('click', () =>{
        for(var i = 0; i < todoList.length; i++){
            console.log(todoList[i]);
        }
    })
}

todo();

