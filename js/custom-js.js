

window.onload = function () 
{
    var urlInput= document.getElementById('FeedURL');
    urlInput.addEventListener('keypress',getRssData);
}


var getRssData = function(event,a,b) {
    var keyCode = event.keyCode || event.which;
    if(keyCode ==13) 
    {
        var XmlHttp = null;
        if (window.XMLHttpRequest) 
        {
            XmlHttp = new XMLHttpRequest();
        }
        else 
        {
            XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        XmlHttp.onreadystatechange = function () 
        {
            //alert(document.getElementById("FeedURL").value);
            if(XmlHttp.readyState == 4 && XmlHttp.status == 200) 
            {
                //console.log(XmlHttp.responseText);
                var Rss_Data = JSON.parse(XmlHttp.responseText);
               
                var headerData = document.createElement('div');
                headerData.className += 'header-data';
                /*var commonInfo = document.createElement('label');
                commonInfo.innerHTML = "FeedUrl : " + Rss_Data.responseData.feed.feedUrl;
                headerData.appendChild(commonInfo);
                var br = document.createElement('br');
                headerData.appendChild(br);*/

                var commonInfo = document.createElement('label');
                commonInfo.className += 'Header-Title-Font';
                commonInfo.innerHTML = Rss_Data.responseData.feed.title;
                headerData.appendChild(commonInfo);
                var br = document.createElement('br');
                headerData.appendChild(br);

                /*commonInfo = document.createElement('label');
                commonInfo.innerHTML = "Link : " + Rss_Data.responseData.feed.link;
                headerData.appendChild(commonInfo);
                br = document.createElement('br');
                headerData.appendChild(br);

                commonInfo = document.createElement('label');
                commonInfo.innerHTML = "Author : " + Rss_Data.responseData.feed.author;
                headerData.appendChild(commonInfo);
                br = document.createElement('br');
                headerData.appendChild(br);*/

                commonInfo = document.createElement('p');
                commonInfo.innerHTML = Rss_Data.responseData.feed.description;
                headerData.appendChild(commonInfo);
                

                /*commonInfo = document.createElement('label');
                commonInfo.innerHTML = "Type : " + Rss_Data.responseData.feed.type;
                headerData.appendChild(commonInfo);
                br = document.createElement('br');
                headerData.appendChild(br);*/
                document.getElementById("Rss-Container").appendChild(headerData);
                console.log("1");
                i=0;
                while(Rss_Data.responseData.feed!='undefined')
                //for(i=0;i<Rss_Data.responseData.feed.entries.length;i++)
                {
                
                    console.log(i);
                    var news = document.createElement('div');
                    //news.className += 'news';
                    if(i%2==0){
                        news.className += 'news even-news-row';
                    }
                    else
                    {
                        news.className += 'news odd-news-row';
                    }
                    var newsHeader = document.createElement('row');

                    var newsTitleContainer = document.createElement('col-lg-7');
                    var newsTitle = document.createElement('label');
                    newsTitle.className += 'underlined-text';
                    newsTitle.innerHTML = Rss_Data.responseData.feed.entries[i].title;
                    newsTitleContainer.appendChild(newsTitle);

                    var newsPublishedDateContainer = document.createElement('col-lg-3');
                    newsPublishedDateContainer.className += 'pull-right';
                    var newsPublishedDate = document.createElement('p');
                    newsPublishedDate.className += 'regular-text';
                    newsPublishedDate.innerHTML = Rss_Data.responseData.feed.entries[i].publishedDate;
                    newsPublishedDateContainer.appendChild(newsPublishedDate);

                    newsHeader.appendChild(newsTitleContainer);
                    newsHeader.appendChild(newsPublishedDateContainer);

                    var newsDescritpionContainer = document.createElement('row');
                    newsDescritpionContainer.className += 'news-desc';
                    var newDescription = document.createElement('p');
                    newDescription.innerHTML = Rss_Data.responseData.feed.entries[i].contentSnippet;
                    newsDescritpionContainer.appendChild(newDescription);

                    news.appendChild(newsHeader);
                    news.appendChild(newsDescritpionContainer);

                    document.getElementById('Rss-Container').appendChild(news);
                    i++;
            }

            }

        }
        //XmlHttp.open("GET", "http://dev-mystique.tavisca.com/api/deals/all?token=gr53hsvjo12dst5xxbr1ddfm&$filter=Type eq 'hotel'", true);
        XmlHttp.open("GET", "http://googlefeed.appacitive.com/?q="+document.getElementById("FeedURL").value, true);
        XmlHttp.send();
    }
}
