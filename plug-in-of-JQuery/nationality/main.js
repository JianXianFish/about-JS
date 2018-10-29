$(function(){
    $(".con-list").each(function () {
        var input = $(this).find("#nationality");
        var list = $(this).find(".nationality-suggest-list");
        new nationality({ input: input, list: list });
    })
})