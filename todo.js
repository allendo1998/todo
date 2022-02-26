const todo = () => {
    var activity = document.getElementById("activity");
    var debug = document.getElementById("debug");
    var clear = document.getElementById("clear");
    var list = document.getElementById("list");
    const todo = [];
    var index = 0;
    
    load_data();

    activity.addEventListener("keyup", function(event) {
        if(event.key === 'Enter'){
            var user_input = activity.value;
            if(user_input.length > 0) {
                activity.value = null;
                todo.push(user_input);
                add(todo.length - 1 ,user_input);
            }
        }
    })

    async function add(key, user_input) {
        console.log(user_input);
        try {
            var value_key = key;
            var value = user_input;
            chrome.storage.local.set({ [value_key]: value });
          } catch (err) {
            console.log(err);
          }
    }

    function load_data(){
        chrome.storage.local.get(null, function(items) {
            console.log(items);
            for(const [key, value] of Object.entries(items)){
                console.log(key,value);
                todo[key] = value;
                index++;
            }       
        });
    }

    debug.addEventListener('click', () =>{
        chrome.storage.local.get(null, function(items) {
            console.log(items);
            for(const [key, value] of Object.entries(items)){
                console.log(key,value);
            }       
        });
    })

    clear.addEventListener('click', () =>{
        chrome.storage.local.clear(() => {
            index = 0;
        });
    })
}

todo();

