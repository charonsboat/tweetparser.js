var Format = require('./Format');

var Entity = function (entity, type)
{
    var html = '';

    switch (type)
    {
        case 'hashtag':
            html = Format.hashtag(entity);
            break;
        case 'url':
            html = Format.url(entity);
            break;
    }

    return {
        start: entity.indices[0],
        end: entity.indices[1],
        html: html
    };
};

var aggregate = function (entities)
{
    var results = [];

    // gather hashtag entities
    for (var i = 0; i < entities.hashtags.length; ++i)
    {
        var entity = new Entity(entities.hashtags[i], 'hashtag');

        results[entity.start] = entity;
    }

    // gather user_mention entities
    for (var i = 0; i < entities.user_mentions.length; ++i)
    {
        // var entity = new Entity(entities.user);
        //
        // results[entities.user_mentions[i].indices[0]] = entities.user_mentions[i];
    }

    // gather url entities
    for (var i = 0; i < entities.urls.length; ++i)
    {
        var entity = new Entity(entities.urls[i], 'url');

        results[entity.start] = entity;
    }

    return results;
};

var TweetParser = {};

TweetParser.parse = function (tweet, ignore_newlines)
{
    var text = tweet.text;
    var entities = aggregate(tweet.entities);

    var sb = '';

    for (var i = 0; i < text.length; )
    {
        var entity = entities[i] || null;

        if (null === entity)
        {
            sb += text.charAt(i++);
        }
        else
        {
            sb += entity.html;
            i = entity.end;
        }
    }

    if (!ignore_newlines)
    {
        sb = sb.replace('\n', '<br>');
    }

    return sb;
};

module.exports = TweetParser;
