const todo = () => {
    var activity = document.getElementById("activity");
    var debug = document.getElementById("debug");
    var clear = document.getElementById("clear");
    var list = document.getElementById("list");
    const todo = [];    
    load_data();

    activity.addEventListener("keyup", function(event) {
        if(event.key === 'Enter'){
            var user_input = activity.value;
            if(user_input.length > 0) {
                activity.value = null;
                todo.push({task: user_input, completed: false});
                add();
                display_todo_list();
            }
        }
    })

    list.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "LI") {
            console.log("i am clicking");
            // var item = document.getElementById(e.target.id);
            if(todo[e.target.id].completed === false) {
                todo[e.target.id].completed = true;
                add();
            }
            else {
                todo[e.target.id].completed = false;
                add();
            }

            check_completed(e.target.id);
        }
    })

    async function add() {
        try {
            var value_key = 'todo';
            chrome.storage.local.set({ [value_key]: todo });
          } catch (err) {
            console.log(err);
          }
    }

    function load_data(){
        try {
            chrome.storage.local.get(['todo'], function(items) {
                if(items.todo.length > 0){
                    for(var i = 0; i < items.todo.length; i++){
                        console.log(items.todo[i]);
                        todo.push(items.todo[i]);
                    }
                    console.log(todo.length);
                    display_todo_list();
                }
            });
        } catch (err) {
            console.log("List is empty");
        }
    }

    function check_completed(id){
        var task = document.getElementById(id);

        if(todo[id].completed === false) {
            task.style.textDecorationLine = "none";
        }
        else {
            task.style.textDecorationLine = "line-through";
        }

    }

    function display_todo_list() {
        console.log("i need to display something");
        list.innerHTML = '';
        for(var i = 0; i < todo.length; i++) {
            var item = todo[i];
            var li = document.createElement('li');
            li.setAttribute("id", i);
            li.appendChild(document.createTextNode(item.task));
            list.appendChild(li);
            check_completed(i);
        }
    }

    debug.addEventListener('click', () =>{
        try {
            chrome.storage.local.get(['todo'], function(items) {
                console.log(todo.length);
                if(items.todo.length > 0){
                    for(var i = 0; i < items.todo.length; i++){
                        console.log(items.todo[i].task);
                        console.log(items.todo[i].completed);
                    }
                } 
            });
        } catch (err) {
            console.log("List is empty");
        }

    })

    clear.addEventListener('click', () =>{
        chrome.storage.local.clear();
        list.innerHTML = ' ';
    })
}

todo();

