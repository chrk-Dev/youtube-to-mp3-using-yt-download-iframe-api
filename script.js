 
	title = document.createElement("h1")
	info=document.createElement('h3')
	input=document.createElement('input')
	button=document.createElement('button')
	div=document.createElement('div')
	songtitle=document.createElement('h4')
	img=document.createElement('img') 
	
	document.body.appendChild(title)
	document.body.appendChild(info)
	document.body.appendChild(input)
	document.body.appendChild(button)
	document.body.appendChild(songtitle)
	document.body.appendChild(img)
	document.body.appendChild(div)

	title.innerHTML='youtube to mp3 using yt-download iframe api'
	info.innerHTML="url must be like that: <br> <ui> <li> https://www.youtube.com/watch?v=YFMLHCMc91c</li><li> https://youtu.be/YFMLHCMc91c </li> <li> www.youtube.com/watch?v=YFMLHCMc91c </li> </ui>"  
	input.id='urlinput'
	songtitle.id='songtitle'
	div.id='result'
	button.innerHTML='Download'
	input.value="https://youtu.be/dQw4w9WgXcQ"
	button.setAttribute('onclick',"main()")

	
function main() {
	var geturl=document.getElementById('urlinput').value
	let validRex=/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
	
	if (validRex.test(geturl)===false){
		document.getElementById('result').innerHTML='invalid url'
	} else{
		document.getElementById('result').innerHTML=''

	}

	VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

	urlId=geturl.match(VID_REGEX)[1]

	apiurl='https://www.googleapis.com/youtube/v3/videos?key=AIzaSyB0Q4gThms2Jt-6SgMYj4udYKfVfXNsrcc&part=snippet&id=' + urlId

	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	var myObj = JSON.parse(this.responseText)
      document.getElementById("songtitle").innerHTML =
      myObj.items[0].snippet.title + ' Download or Listing .mp3 here'
      document.getElementsByTagName('img')[0].src=myObj.items[0].snippet.thumbnails.medium.url
    }
    
  };
  xhttp.open("GET",apiurl, true);
  xhttp.send();
  link='https://www.yt-download.org/api/button/mp3/'+urlId

  const parser = new DOMParser()
  
  qlity=['320kbps','256kbps','192kbps','128kbps','64kbps']

  var xhttp = new XMLHttpRequest();
  document.getElementById('result').innerHTML='<br><h3> Loading... </h3><img src="https://i.pinimg.com/originals/49/d3/90/49d390ed4b730c2a927c82c62baa0e43.gif" height="200" width="250">' 
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       data=xhttp.responseText
       doc = parser.parseFromString(data, "text/html")
       tag=doc.getElementsByTagName('a')

       ele=[]
       for (var i = tag.length - 1; i >= 0; i--) {
       	ele.push('<button><a class='+ qlity[i] +' href=' + tag[i].href + '>#' + qlity[i] +' </a></button>')
       }  
       document.getElementById('result').innerHTML='<br>Listing mp3 :<br><br>  <audio controls src='+tag[4].href + '></audio><br><br>Or Download: '+ ele

          }
}

xhttp.open("GET", link, true);
xhttp.send();
}



// author:-
// https://www.reddit.com/user/charuka0
// https://twitter.com/Charu_ka 

// inspired by, 
//    https://www.freecodecamp.org/news/client-side-web-scraping-with-javascript-using-jquery-and-regex-5b57a271cb86
// article