const todo = () => {
    var activity = document.getElementById("activity");
    var row = document.getElementById("row");
    
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

    row.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "A") {
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
        row.innerHTML = '';
        for(var i = 0; i < todo.length; i++) {
            var item = todo[i];

            var section = document.createElement('div');
            section.setAttribute("class", "section");

            var left = document.createElement('div');
            left.setAttribute("class", "left");

            var center = document.createElement('div');
            center.setAttribute("class", "center");

            var right = document.createElement('div');
            right.setAttribute("class", "right");

            var task = document.createElement('p');
            task.setAttribute("id", i);
            task.appendChild(document.createTextNode(item.task));

            var btn = document.createElement("a");
            btn.setAttribute("id", "btn" + i);
            btn.appendChild(document.createTextNode("x"));

            var checkbox = document.createElement("p");
            checkbox.setAttribute("id", "checkBox" + i );
            checkbox.appendChild(document.createTextNode("o"));

            left.appendChild(checkbox);
            right.appendChild(btn)
            center.appendChild(task);
            section.appendChild(left);
            section.appendChild(center);
            section.appendChild(right);
            row.appendChild(section);
        }
    }
}

todo();