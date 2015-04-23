# Bid JavaScript plugin
Let's say you've got input with dynamic search and you don't want it to send request to server after every key press (especially when user is writing very fast). You want to send request when user stopped writing and didn't press another key for some short time like 200ms.

##Example of useage

First let's create `Bid` object that will wait `500ms` (default is `200ms`) after last bump before calling callback.

    var keyBid = new Bid(function(){
        alert("No key pressed for 500ms");
    }, 500);
    
    
Now let's attach event to keypress on some input and make it bump our bid:

    $("input").keyup(function(){
        keyBid.bump(); //after every keypress bump bid for another bid time (500ms in this case)
    });
    
Now, while you'll be writing quickly - nothing will happen. But if you'll stop writing for 500ms, callback will be called.

Also, it's very common that you'll want to pass some informations to callback (for example value of input). You can pass parameters to bump function and they will be accessable as parameters in function you've passed when creating bid object. Also, first parameter is accessable as `this` inside callback function.

    var keyBid = new Bid(function(value){
        alert("No key pressed for 500ms. Actual input value is: " + value);
        //also, first parameter passed to this function is accessable as 'this'. So this == value would be true here
    }, 500);
    
    $("input").keyup(function(){
        keyBid.bump( $(this).val() ); //passing parameter to callback ( you can pass as many as you want )
    });
    
And thats it.

Also - `Bid` object have some additional functions:

    var bidObject = new Bid(function(){});
    bidObject.stop(); //will stop bid without calling callback (you can .bump it again later)
    bidObject.finish(); //stops bid and calls callback immediately


