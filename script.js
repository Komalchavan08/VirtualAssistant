let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

window.speechSynthesis.onvoiceschanged = () => {
    let voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices);
};

function speak(text)
{
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning")
    }
    else if(hours>=12 && hours<16){
        speak("Good Afternoon")
    }
    else{
        speak("Good Evening")
    }
}

window.addEventListener('load',()=>{
    wishMe()
})

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;

if (!speechRecognition) {
    alert("Speech recognition is not supported in your browser. Please use Google Chrome or Microsoft Edge.");
} else
{
let recognition =new speechRecognition();

recognition.onresult=(event)=>{

    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(message)
{
    btn.style.display="flex"
    voice.style.display="none"

    if(message.includes("hello") || message.includes("hey")){
        speak("hello mam,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("I am Sophie, A virtual assistant, created by komal")
    }
    else if(message.includes("open YouTube")){
        speak("opening YouTube..")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google..")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook..")
        window.open("https://www.facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram..")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("time")){
     let time =new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
     speak(time)
    }

    else{
       let finalText="this is what i found on internet regarding" + message.replace("Sophie","") || message.replace("=Sophie","")
       speak(finalText)
       window.open(`https://www.google.com/search?q=${message.replace("Sophie","")}`,"_blank")
    }
}
}



       