$(document).ready(function() {

    
    // Interaction 1: Story Popup

    // The story is just a intro to the education content. So if users would like to 
    // read more about the story, they could click the "Read More Story" link, a 
    // window will popup. After they read the story, they can click "close" back to 
    // the introducation to IoTs.

	$("#story .read-more a, #story-popup .close-button a").click(function(event) {
		$("body").toggleClass("show-story-popup");
        event.preventDefault();
    });
    

    // Interaction 2: Change the background color when user enter education part

    // This interaction use the ScrollMagic Library.
    // When user enter education part after read the story part, the background color
    // will change,to remind users they enter a new part.
    
    var controller = new ScrollMagic.Controller();

	var ourScene = new ScrollMagic.Scene({
        triggerElement: '#intro',
        triggerHook: 0.9,
	})
    .setClassToggle('section', 'story-color')
    .addTo(controller);


    // Interaction 3: Decomposition of IoT refrigerator example.

    // Best viewed in Chrome
    // This interaction also use the jQuery, ScrollMagic, and TweenMax Library.
    // When user enter into IoTs concept part. There will be a example to decomposed the 
    // IoTs concept. The page will pin the previous one, and swipe into the inner part, 
    // which refers to the decomposing step by step.

    // Scene 1: Thing
    new ScrollMagic.Scene({
		triggerElement: ".event.event2",
		triggerHook: "onEnter",
		duration: "100%"
	}).setPin(".events-page .event.event1 .pinWrapper",{
		pushFollowers: false
	}).addTo(controller);

    // Scene 2: Computational Intelligence
	new ScrollMagic.Scene({
		triggerElement: ".event.event2",
		triggerHook: "onEnter",
		duration: "200%"
	}).setPin(".events-page .event.event2 .pinWrapper",{
		pushFollowers: false
    }).addTo(controller);
    
    // Scene 3: Internet Connectivity
	new ScrollMagic.Scene({
		triggerElement: ".event.event3",
		triggerHook: "onEnter",
		duration: "100%"
	}).setPin(".events-page .event.event3 .pinWrapper",{
		pushFollowers: false
	}).addTo(controller);


});


// Interaction 4 & 5 are in the quizScript.js
