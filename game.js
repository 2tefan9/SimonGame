
var UserClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var level=1;
var index=0;
var start=false;

$(document).on("keydown", function(event)
{
    var id=event.key;
    if(!start && id==="a")
    {
        nextSequence();
        start=true;
    }
})

function CheckAnswer(currentLevel,currentIndex)
{
    if(UserClickedPattern[currentIndex]===gamePattern[currentIndex])
    {
        console.log(currentIndex +"is the same");
        console.log(currentLevel+ "is equale"+ currentIndex);
        console.log( "Grandezza array randomico"+ gamePattern.length);
        if(UserClickedPattern.length===gamePattern.length)
        {
            UserClickedPattern=[];
            console.log(UserClickedPattern+"contenuto array giocatore");
            index=0;
            level++;
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        else{console.log("continua");index++; }
    }
    else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("red");
        setTimeout(function(){
            $("body").removeClass("red");
        },200);
        $("h1").text("Game Over, Press Key a to Restart ");
        startOver();
    }

}

$(".btn").on("click",handleButton);
function handleButton(){
    var userChosenColour=(this.id);
    UserClickedPattern.push(userChosenColour);
    console.log(UserClickedPattern);
    playSound(this.id);
    animatedPress(this.id);
    CheckAnswer(level-1, index);
}

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatedPress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function nextSequence() {
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random() * (3+1));
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function startOver()
{
    gamePattern=[];
    start=false;
    level=1;
    index=0;
    UserClickedPattern=[];
}

