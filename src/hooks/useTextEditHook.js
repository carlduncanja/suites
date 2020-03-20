export const transformToCamel = (word) =>{
    let newWord = word.replace(/ /g,"");
    return (newWord.charAt(0).toLowerCase().concat(newWord.substring(1,newWord.length)))
}

export const transformToSentence = (word) =>{
    let newWord = word.replace(/([A-Z])/g, " $1")
    return newWord.charAt(0).toUpperCase() + newWord.slice(1);
}