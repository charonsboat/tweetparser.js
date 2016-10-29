var Format = {};

Format.hashtag = function (entity)
{
    return '<a href="https://twitter.com/hashtag/' + entity.text + '">#' + entity.text + '</a>';
};

Format.user_mention = function (entity)
{
    //
};

Format.url = function (entity)
{
    return '<a href="' + entity.url + '">' + entity.display_url + '</a>';
};

module.exports = Format;
