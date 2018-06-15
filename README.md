# MyMangaDex

Script inspiré de KissAnimeList pour synchroniser ses mangas suivis sur MangaDex avec sa liste MyAnimeList

Start when document finished loading (document-end)

Follow page
* Highlight chapters if read
Manga page
* Write MAL information about the chapters read, score
* Highlight last read chapters / last open
Chapter page
* Update last chapter read to the current one if higher

Stored data
* MAL id, last open chapter (not saved on mal) and the sub chapter if there is one, for a MangaDex id
  * mangadex_id:{last_open, last_open_sub, mal_id}

---

Useful page ? https://myanimelist.net/mangalist/Glagan/load.json?offset=&status=1
URL to edit manga on MAL: https://myanimelist.net/ownlist/manga/[id]/edit
URL to add a manga on MAL: https://myanimelist.net/ownlist/manga/add?selected_manga_id=[id]
Required header to POST
```javascript
{
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    }
}
```
Useful to auto set the finish date
```javascript
add_manga[finish_date][year] = Datec.getFullYear();
add_manga[finish_date][month] = Datec.getMonth()+1;
add_manga[finish_date][day] = Datec.getDate();
```

Colors used:
* Last open: rebeccapurple
* Actual last read chapter on mal: cadetblue
* All chapters lower than the last read and that are read: yellow (maybe)

---

Detect chapter number:
* Ch. [number]
Optionnal sub chapter (the floating point)
* Ch. [number].[sub_chapter]
And the volume number (optionnal) on
* Vol. [number]

Detection on the chapter page:
* optionnal Volume [number] and the chapter with optionnal sub chapter Chapter [number].[sub_chapter]

---

## Manga Page
1. check if user is logged in
  * abort if not logged in
2. get manga name and mangadex_id
3. check if there is a entry for this manga in the local storage
  * if there is an entry, add the mal id to the MyMangaDex object
  * if there is no entry, check if there is a mal link
    * if there is a mal link, add it to the MyMangaDex object and add the entry is the local storage
    * if there is no mal link, add the link entry form

## Change log
Before release done:
* detect which page is the current one
* detect if user is logged in
* fetch last read chapter on mal and display it
* highlight last read chapter
* detect each chapters, with optionnal volume and "sub" chapter (eg: 18[.2])
* Better readme
* separated each pages in functions for clarity
* Check if there is a mal id stored to avoid looking for it
* Store the mal url in local storage
* Fetch MAL link from manga page if directly on chapter page
* Track of last_open (update on chapter page)
* Avoid looking twice for mal link by setting it to 0
* clear local storage when visiting https://mangadex.org/about
* update mal chapter according to the current reading chapter on chapter page

## TODO
* check only every x minutes or so but check when sending data
* Follow page:
  * Highlight if last_read
* Manga page:
  * offset
  * button to add manga to reading list
  * add mal link if there isn't on the page
* chapter page:
  * add manga to reading list if not in (with start date)

## Legacy code
Optionnal way to fetch manga and chapter info on chapter page:
```javascript
MyMangaDex.manga_name = document.getElementsByClassName("panel-title")[0].textContent;

var chapter_select = document.querySelector("button[data-id='jump_chapter']");
var volume_and_chapter = /(Volume\s(\d+)|).*(Chapter\s(\d+))\.*(\d+)*/.exec(chapter_select.title);
MyMangaDex.current_chapter = {
  volume: volume_and_chapter[2],
  chapter: volume_and_chapter[4],
  sub_chapter: volume_and_chapter[5]
}
```