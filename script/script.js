const manageSpinner = (status) => {

    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("wordContainer").classList.add("hidden");
    }
    else {
        document.getElementById("wordContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }

}



const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}



const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}




const loadLevelWord = (id) => {

    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};


const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("modalBox")
    detailsBox.innerHTML = `
        

        <!-- Content with border -->
        <div class="border-2 border-blue-200 rounded-2xl p-6">
            <!-- Header with word and pronunciation -->
            <div class="mb-6 flex justify-between">
                <h3 class="text-2xl font-bold text-black mb-2">
                    ${word.word}
                    <span class="inline-flex items-center ml-2">
                        <button onclick="pronounceWord('${word.word}')"
                                    class="btn btn-sm btn-circle bg-sky-500/10">
                                    <i class="fa-solid fa-volume-high text-sky-600"></i>
                        </button>
                        <span class="ml-1 font-bn">:(${word.pronunciation})</span>
                    </span>
                </h3>
                <!-- Close button -->
                    <form method="dialog" class="">
                        <button class="btn btn-sm btn-circle btn-ghost">✕</button>
                    </form>
            </div>

            <!-- Meaning section -->
            <div class="mb-6">
                <h4 class="text-lg font-semibold text-black mb-3">Meaning</h4>
                <p class="text-black font-bn text-lg">${word.meaning}</p>
            </div>

            <!-- Parts of Speech section -->
            <div class="mb-6">
                <h4 class="text-lg font-semibold text-black mb-3">Parts of Speech</h4>
                <p class="text-black font-bn text-lg">${word.partsOfSpeech}</p>
            </div>

            <!-- Example section -->
            <div class="mb-6">
                <h4 class="text-lg font-semibold text-black mb-3">Example</h4>
                <p class="text-gray-700 mb-2">${word.sentence}</p>
            </div>

            <!-- Synonym tags -->
            <p class="text-lg font-semibold text-black mb-3 font-bn">সমার্থক শব্দ গুলো</p>
               <div class="flex flex-wrap gap-2 mb-6">
                             ${word.synonyms && word.synonyms[0] ? `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-2xl text-sm cursor-pointer hover:bg-blue-200" onclick="pronounceWord('${word.synonyms[0]}')">${word.synonyms[0]}</span>` : ''}
                             ${word.synonyms && word.synonyms[1] ? `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-2xl text-sm cursor-pointer hover:bg-blue-200" onclick="pronounceWord('${word.synonyms[1]}')">${word.synonyms[1]}</span>` : ''}
                             ${word.synonyms && word.synonyms[2] ? `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-2xl text-sm cursor-pointer hover:bg-blue-200" onclick="pronounceWord('${word.synonyms[2]}')">${word.synonyms[2]}</span>` : ''}
               </div>
        </div>

        <!-- Complete Learning button - outside border, left aligned -->
        <form method="dialog" class="flex justify-center mt-5">
            <button class="btn btn-primary w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
                Complete Learning
            </button>
        </form>
    `;
    document.getElementById("my_modal_5").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("wordContainer");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="justify-center items-center text-center  font-bn col-span-full">
            <img src="./assets/alert-error.png" alt="alert" class="w-1/10 mx-auto">
            <h1 class="   text-zinc-700 text-center mb-6 font-bn lg: text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
            <h1 class="text-3xl font-bold text-center mb-2 font-bn">নেক্সট Lesson এ যান</h1>
            
        </div>
        `
        manageSpinner(false);
        return;
    }

    // words.words is the array of words
    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = ` <div class="w-[100%] h-[100%] relative bg-white rounded-xl justify-center text-center p-8 pt-8 gap-5">
            <h1 class=" text-center justify-center text-black text-3xl font-bold font-['poppins'] leading-normal mt-4">
                ${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
            <p class="text-center justify-center text-black text-xl font-medium font-['poppin'] leading-normal mt-4">
                Meaning /Pronounciation</p>
            <h1 class="opacity-80 justify-center text-zinc-900 text-xl font-semibold font-bn mt-4">
                "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h1>

            <div class="flex justify-between items-center gap-5 mt-15">
                <button onclick="loadWordDetail(${word.id})" class="card-btn  w-14 h-14 bg-sky-500/10 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="card-btn w-14 h-14 bg-sky-500/10 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });

    manageSpinner(false);
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";



    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" id="lesson-btn-${lesson.level_no}" class="btn btn-outline btn-primary w-[100%] mt-2 p-4 text-xl lesson-btn">
                <i class="fa-solid fa-book"></i>
                Lesson  ${lesson.level_no}
            </button>
        `;
        levelContainer.append(btnDiv);
    }
}


// Function to pronounce a word using text-to-speech with female voice
const pronounceWord = (word) => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        // Function to speak with female voice
        const speakWithFemaleVoice = () => {
            const utterance = new SpeechSynthesisUtterance(word);

            // Set speech properties for clear female voice
            utterance.rate = 0.75; // Optimal speed for clarity
            utterance.pitch = 1.2; // Higher pitch for female voice
            utterance.volume = 1; // Maximum volume
            utterance.lang = 'en-US'; // English pronunciation

            // Get all available voices
            const voices = speechSynthesis.getVoices();

            // Find female English voices (priority order)
            const femaleVoice = voices.find(voice =>
                voice.lang.startsWith('en') && (
                    voice.name.toLowerCase().includes('female') ||
                    voice.name.toLowerCase().includes('zira') ||
                    voice.name.toLowerCase().includes('hazel') ||
                    voice.name.toLowerCase().includes('susan') ||
                    voice.name.toLowerCase().includes('karen') ||
                    voice.name.toLowerCase().includes('samantha') ||
                    voice.name.toLowerCase().includes('alice') ||
                    voice.name.toLowerCase().includes('fiona') ||
                    voice.name.toLowerCase().includes('moira') ||
                    voice.name.toLowerCase().includes('tessa') ||
                    voice.name.toLowerCase().includes('veena') ||
                    voice.name.toLowerCase().includes('serena')
                )
            ) || voices.find(voice =>
                voice.lang === 'en-US' && !voice.name.toLowerCase().includes('male')
            ) || voices.find(voice => voice.lang.startsWith('en'));

            if (femaleVoice) {
                utterance.voice = femaleVoice;
                console.log('Using voice:', femaleVoice.name);
            }

            // Speak the word
            speechSynthesis.speak(utterance);
        };

        // Ensure voices are loaded before speaking
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', speakWithFemaleVoice, { once: true });
        } else {
            speakWithFemaleVoice();
        }
    } else {
        // Fallback for browsers that don't support speech synthesis
        alert('Sorry, your browser does not support text-to-speech functionality.');
    }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    manageSpinner(true); // Show loading spinner during search

    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase(); // Fixed: toLowerCase() not tolowerCase()
    
    console.log(searchValue);

    if (searchValue === "") {
        alert("Please enter a word to search");
        manageSpinner(false);
        return;
    }

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            console.log(allWords);
            const filterWords = allWords.filter((word) => 
                word.word.toLowerCase().includes(searchValue)
            );
            displayLevelWord(filterWords);
        })
        .catch(error => {
            console.error("Search error:", error);
            manageSpinner(false);
        });
});

