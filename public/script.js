let currentIndex = 0;
let wordData = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        wordData = data;
        displayWord(currentIndex);
    });

    function displayWord(index) {
        const word = Object.keys(wordData[index])[0];
        const details = wordData[index][word];
        const cardContainer = document.getElementById('wordCardContainer');
    
        let wordFamilyHtml = '';
        for (let family in details["Word Family"]) {
            wordFamilyHtml += `<p><strong>${family}:</strong> ${details["Word Family"][family]}</p>`;
        }
    
        let synonymsHtml = Array.isArray(details["Synonyms and Antonyms"]["Synonyms"]) ? 
                            details["Synonyms and Antonyms"]["Synonyms"].join(", ") :
                            details["Synonyms and Antonyms"]["Synonyms"];
        let antonymsHtml = Array.isArray(details["Synonyms and Antonyms"]["Antonyms"]) ? 
                            details["Synonyms and Antonyms"]["Antonyms"].join(", ") :
                            details["Synonyms and Antonyms"]["Antonyms"];
    
        cardContainer.innerHTML = `
            <h2>${word}</h2>
            <p><strong>Pronunciation:</strong> ${details["Pronunciation"]}</p>
            <p><strong>Korean Translation:</strong> <span class="hidden-text">${details["Korean Translation"]}</span></p>
            <p><strong>Part of Speech:</strong> ${details["Part of Speech"]}</p>
            <p><strong>Definition (English):</strong> ${details["Definitions"]["English"]}</p>
            <p><strong>Definition (Korean):</strong> <span class="hidden-text">${details["Definitions"]["Korean"]}</span></p>
            <p><strong>Etymology:</strong> ${details["Etymology"]["Root"]}</p>
            <p><strong>Example Sentence (English):</strong> ${details["Example Sentence"]["English"]}</p>
            <p><strong>Example Sentence (Korean):</strong> <span class="hidden-text">${details["Example Sentence"]["Korean"]}</span></p>
            ${wordFamilyHtml}
            <p><strong>Synonyms:</strong> <span class="hidden-text">${synonymsHtml}</span></p>
            <p><strong>Antonyms:</strong> <span class="hidden-text">${antonymsHtml}</span></p>
        `;
    }
    
    // 기존의 currentIndex 및 fetch 코드는 그대로 유지

    
document.getElementById('nextWord').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % wordData.length;
    displayWord(currentIndex);
});

document.getElementById('prevWord').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + wordData.length) % wordData.length;
    displayWord(currentIndex);
});
