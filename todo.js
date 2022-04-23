const todo = () => {
    var activity = document.getElementById("activity");
    var row = document.getElementById("row");
    
    const todo = [];    
    load_data();

    /*
    *   Add Task based on what the user has entered
    *   in the text field
    */
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

    /*
    *   Wait for user to select remove task button
    */
    row.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "A") {
           var id = e.target.id.substr(e.target.id.length - 1);
            remove(id);
            display_todo_list();
        }
    })

    /*
    *   Wait for user to select task and change state
    *   from being complete or incomplete
    */
    row.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "P" || e.target && e.target.nodeName == "I") {
            var id = e.target.id.substr(e.target.id.length - 1);
            if(todo[id].completed === false){
                todo[id].completed = true;
            }
            else {
                todo[id].completed = false;
            }
            add();
            check_completed(id);
        }
    })

    /*
    *   Update database based on the list locally created
    */
    async function add() {
        try {
            var value_key = 'todo';
            chrome.storage.local.set({ [value_key]: todo });
          } catch (err) {
            console.log(err);
          }
    }

    /*
    *   Remove task from list
    *  
    *   @param {id}:
    *       id of task
    */
    function remove(id) {
        if(id == 0){
            todo.splice(0,1);
        }
        else {
            todo.splice(id,id);
        }        
        add();
    }


    /*
    *   Load local list with tasks saved from
    *   the database
    */
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

    /*
    *   Check if tasks is complete or incomplete and 
    *   change the appearence of task
    *  
    *   @param {id}:
    *       id of task
    */
    function check_completed(id){
        console.log(todo[id].completed);
        if(todo[id].completed === false) {
            document.getElementById(id).style.textDecorationLine = "none";
            document.getElementById("checkBox" + id).setAttribute("class", "material-icons-outlined");
            document.getElementById("checkBox" + id).innerHTML = 'circle';
            document.getElementById("checkBox" + id).style.color = "#808080";

        }
        else {
            document.getElementById(id).style.textDecorationLine = "line-through";
            document.getElementById("checkBox" + id).setAttribute("class", "material-icons-sharp");
            document.getElementById("checkBox" + id).innerHTML = 'check_circle'; 
            document.getElementById("checkBox" + id).style.color = "#1DB954"; 
        }
    }

    /*
    *   Display list of tasks
    */
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
            btn.setAttribute("class", "material-icons-outlined");
            btn.appendChild(document.createTextNode("clear"));

            var checkbox = document.createElement("i");
            checkbox.setAttribute("id", "checkBox" + i );
            checkbox.setAttribute("class", "material-icons-outlined");
            checkbox.appendChild(document.createTextNode("circle"));

            left.appendChild(checkbox);
            right.appendChild(btn)
            center.appendChild(task);
            section.appendChild(left);
            section.appendChild(center);
            section.appendChild(right);
            row.appendChild(section);

            check_completed(i);
        }
    }
}

todo();