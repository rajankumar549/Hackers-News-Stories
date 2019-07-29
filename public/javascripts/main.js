$(document).ready(function(){
    $("#searchNews").on("submit",function(e){
        e.preventDefault();
        var url=  $("#searchNewsByUrl").val(),
            title=  $("#searchNewsByTitle").val(),
            text=  $("#searchNewsBytext").val(),
            params = [];
        if(url) {
            params.push({name:'url',value:url});
        }
        if(title) {
            params.push({name:'title',value:title});
        } 
        if(text) {
            params.push({name:'text',value:text});
        } 
        return fetchNews(params);
    })
    fetchNews([]);
});
function GetQueryParams(params){
    var conditions = [];
    params.forEach(function(ele){
        conditions.push(`${ele.name}=${ele.value}`);
    })
    return "?"+conditions.join("&");
}

function fetchNews(params){  
    params = GetQueryParams(params);
    AddLoader("#newsList");
    $.ajax({
        url: `/articles${params}`, 
        params:params,
        success: function(result){
            var news = result.data;
            var temp = []
            var listItems = []
            news.forEach(element => {
                var key = `${element.title}:${element.title}`
                if (temp.includes(key)) {
                    return false;
                }
                listItems.push(GetNewComponent(element))
                temp.push(key);
            });
            console.log(listItems.length)
            $("#newsList").html(listItems.join(""));
        }
    });
}
function GetNewComponent(news){
    if (news && news.text && news.title){
        return `<li class="mdl-list__item mdl-list__item--three-line news-list">
            <span class="mdl-list__item-primary-content">
                <span>${news.title || "Anonymous"}</span>
                <div class="news-url">URL : 
                    <a href="${news.url || ""}">
                        ${news.url || "None"}
                    </a>
                </div>
                <span class="mdl-list__item-text-body">
                    ${news.text}
                </span>
            </span>
            <span class="mdl-list__item-secondary-content">
                <a class="mdl-list__item-secondary-action" href="${news.url || ""}">
                    <i class="material-icons">link</i>
                </a>
            </span>
        </li>`;
    }
    return "";
}
function AddLoader(selector){
    $(selector).html(`<div><p class="mdl-color-text--primary" style="text-align:center"> Fetching News</p><div id="loader" class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="margin: auto;display: flex;"></div></div>`);
    // document.querySelector('#loader').addEventListener('mdl-componentupgraded', function() {
    //     this.MaterialProgress.setProgress(44);
    // });
}