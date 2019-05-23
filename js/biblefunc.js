const BIBLE_KEY = 'BIBLE_DATA';

function loadSession(){
    if(localStorage.getItem(BIBLE_KEY)===null){       
        var request = new XMLHttpRequest();
        request.open('GET', 'https://node-bible-books.paivathiago.now.sh/', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                localStorage.setItem(BIBLE_KEY,request.responseText);
            } else {
                console.error("Tivemos um problema na chamada!")
            }
        };

        request.onerror = function() {
            console.error("Tivemos um problema na chamada!")
        };
        request.send();
    }
    
    setTimeout(()=>console.log(''),2000);
    return JSON.parse(localStorage.getItem(BIBLE_KEY));
    
}

function updateSession(oBible){
    localStorage.setItem(BIBLE_KEY,JSON.stringify(oBible));
}

const updateChapter = (idxBook,chap) =>{
    let result = undefined;
    let biblia = loadSession();
    let aBook = biblia.books.filter((x)=>x.idx===idxBook);
    if(aBook.length>0){
        let chapter = aBook[0].caps.filter((x)=>x.id===chap);
        if(chapter.length>0){
            chapter = chapter[0];
            chapter.lido = !chapter.lido;
            let oBook = aBook[0];
            aBook[0].caps.splice(chapter.id-1,1,chapter);
            biblia.books.splice(aBook[0].idx,1,aBook[0]);
            updateSession(biblia);
        }
    }
    return result;
}