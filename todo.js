const todo = () => {
    var activity = document.getElementById("activity");
    var button = document.getElementById("add");

    activity.addEventListener("keyup", function(event) {
        if(event.key === 'Enter'){
            console.log("enter has been entered");
        }
    })
}

todo();

