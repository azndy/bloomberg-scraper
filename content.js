console.log("This is Bloomberg Market")
filtered=Array.from(document.querySelectorAll("a.story-package-module__story__headline-link")).filter(item=>/spacs?/i.test(item.innerText))
let newHeadlines=[];
let newText="";
//console.log("Local Storage",localStorage["headlines"])
if(filtered.length){
	storage=JSON.parse(localStorage["headlines"]||"[]")
	
	for(element of filtered){
		if(! (storage.find(item=>item.text.trim()==element.innerText.trim()))){
			const newElement={url:element.href,text:element.innerText.trim()}
			storage.push(newElement)
			newHeadlines.push(newElement)
			newText+=(newElement.text+" : "+newElement.url+"\n\r");
		}
	}
	localStorage["headlines"]=JSON.stringify(storage);
	setTimeout(()=>{
		if(newHeadlines.length){
			postDiscordMessage(newText)
		}else{
			console.log("Realoding without posting");
			window.location.reload()
		}
	},1e4)
}

		
function postDiscordMessage(message){
	result=null;
	fetch("https://discordapp.com/api/channels/792312646196002828/messages",{
	method:"POST",
	body:JSON.stringify({content:message}),
	headers:{
	"content-type":"application/json",
	"Authorization": "Bot Nzg3OTgzOTkzNDgzMDM0NzA1.X9c5SA.JJSDgDImyOQldqGJiLnIfaJOW_w",
	"User-Agent": "Potato User Agent"
	}}).then(res=>{
	result=res;console.log("Posted to Discord and Reloaded");
	window.location.reload()
	})
}