const todo = () => {
    var activity = document.getElementById("activity");
    var debug = document.getElementById("debug");
    var clear = document.getElementById("clear");
    var list = document.getElementById("list");
    var removeList = document.getElementById("remove");
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
            console.log(e.target.id);
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

    removeList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "BUTTON") {
            var id = e.target.id.substr(e.target.id.length - 1);
            console.log(id);
            remove(id);
            display_todo_list();
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

    function remove(id) {
        if(id == 0){
            console.log("hi");
            todo.splice(0,1);
        }
        else {
            todo.splice(id,id);
        }        
        add();
    }

    function load_data(){
        try {
            chrome.storage.local.get(['todo'], function(items) {
                if(items.todo.length > 0){
                    for(var i = 0; i < items.todo.length; i++){
                        todo.push(items.todo[i]);
                    }
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
        list.innerHTML = '';
        removeList.innerHTML = '';

        for(var i = 0; i < todo.length; i++) {
            var item = todo[i];
            var li = document.createElement('li');
            li.setAttribute("id", i);
            li.appendChild(document.createTextNode(item.task));
            list.appendChild(li);

            var btn = document.createElement("button");
            btn.setAttribute("id", "btn" + i);
            removeList.appendChild(btn);
            check_completed(i);
        }
    }
}

todo();