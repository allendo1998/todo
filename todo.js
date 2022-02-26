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
                todo.push(user_input);
                add();
            }
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
                    }
                }
            });
        } catch (err) {
            console.log("List is empty");
        }
    }

    debug.addEventListener('click', () =>{
        try {
            chrome.storage.local.get(['todo'], function(items) {
                if(items.todo.length > 0){
                    for(var i = 0; i < items.todo.length; i++){
                        console.log(items.todo[i]);
                    }
                }

                
            });
        } catch (err) {
            console.log("List is empty");
        }

    })

    clear.addEventListener('click', () =>{
        chrome.storage.local.clear();
    })
}

todo();

