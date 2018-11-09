
catBook = 
{
    origin: ['#preface# #statement#', '#statement#'],

    adjective : ['adorable', 'cute', 'fluffy', 'sweet', 'charming', 'huggable'],
    preface : ['Oh My.', 'OMG.', 'Where did you find it?', 'Delightful', 'KAWAII!'],
    statement : ['That cat is so #adjective# ', 'Where did you find that #adjective# kitty', 'It looks so cuddly. Does it need a home?', "I'm sending this #adjective# thing to my mom.", 'Look at the #adjective# coat'],
}

$(document).ready(function() 
{
    setTimeout(function()
    {
        console.log(tracery)
        grammar = tracery.createGrammar(catBook);
    }, 1000 );
})


var generateComment = function () {
    return (grammar.flatten("#origin#"));

}
