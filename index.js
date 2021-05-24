document.addEventListener("DOMContentLoaded", ready);
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/'
function ready(event){
    console.log('loaded')
    let searchIcon = document.querySelector('#search')
    let searchBar = document.querySelector('#searchbar')
    searchIcon.addEventListener('click',(event)=>{
        if(searchBar.value == ''){
            let meanings = document.querySelector('.meanings')
            meanings.innerHTML =  '<h1>Please enter a word</h1>'
        }else{
            // meanings = document.querySelector('.meanings')
            // meanings.innerHTML =  `<h1>${searchBar.value}</h1>`
            let word = searchBar.value
            getMeaning(word)

        }
    })
}

async function getMeaning(word_){
    meanings_container = document.querySelector('.meanings')
    meanings_container.innerHTML = ''
    try {
        result = await fetch(url + word_)
        if(result.status == 404){
            let meanings = document.querySelector('.meanings')
            meanings.innerHTML =  `<h1>There is no such word : ${word}</h1>`
        }
        else if(result.status == 200){
            let cleaned_data  = await result.json()
            ///word.innerHTML = `<h2 class="h2">${word_} <span> <button><img src="volume.png" class="img-thumbnail" alt="" height="30" width="30"></button> </span> </h2>`
            word = document.createElement('div')
            wordtext = document.createElement('h2')
            wordtext.className = 'h2'

            span = document.createElement('span')
            button = document.createElement('button')
            button.addEventListener('click',()=>{
                var msg = new SpeechSynthesisUtterance();
                msg.text = word_;
                window.speechSynthesis.speak(msg);
            })
            img = document.createElement('IMG')
            img.src = 'volume.png'
            img.className = "img-thumbnail"
            img.height = '30'
            img.width='30'

            button.append(img)
            span.append(button)
            wordtext.textContent = word_
            wordtext.append(span)
            word.append(wordtext)
            
            meanings_div = document.createElement('div')

            meanings_text = document.createElement('h2')
            meanings_text.className = 'h2'
            meanings_text.textContent = 'Meanings'
    
            meanings_list = document.createElement('ul')
            
            meanings_div.append(meanings_text)
            meanings_div.append(meanings_list)

            examples_div = document.createElement('div')
            examples_text = document.createElement('h2')
            examples_text.className = 'h2'
            examples_text.textContent = 'Examples'

            examples_list = document.createElement('ul')

            examples_div.append(examples_text)
            examples_div.append(examples_list)
            cleaned_data[0]['meanings'].forEach(element => {
                eachMeaning = document.createElement('li')
                eachExample = document.createElement('li')
                eachMeaning.append(element['definitions'][0]['definition'])
                eachExample.append(element['definitions'][0]['example'])

                meanings_list.append(eachMeaning)
                examples_list.append(eachExample)
            });
            meanings_container.append(word)
            meanings_container.append(meanings_div)
            meanings_container.append(examples_div)
        }
    } catch (error) {
        console.log(error)
        let meanings = document.querySelector('.meanings')
        meanings.innerHTML =  '<h1>We are facing server issues please </h1>'
    }
    
    
    
}