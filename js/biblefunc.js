function loadSession(){
    if(localStorage.getItem('BIBLE_DATA')===null){
        localStorage.setItem('BIBLE_DATA',bible);
    }
    return JSON.parse(localStorage.getItem('BIBLE_DATA'));
}

const updateChapter = (book,chap) =>{
    let result = undefined;
    let aBook = loadSession().books.filter((x)=>x.nm===book);
    if(aBook.length>0){
        let chapter = aBook[0].caps.filter((x)=>x.id===chap);
        if(chapter.length>0){
            chapter = chapter[0];
            result = chapter.lido;
        }
    }
    return result;
}