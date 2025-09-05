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


    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        } );
};





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
        return;
    }

    // words.words is the array of words
    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = ` <div class="w-[100%] h-[100%] relative bg-white rounded-xl justify-center text-center p-8 pt-8 gap-5">
            <h1 class=" text-center justify-center text-black text-3xl font-bold font-['poppins'] leading-normal mt-4">
                ${word.word ? word.word : "শব্দ পাওয়া যায়নি" }</h1>
            <p class="text-center justify-center text-black text-xl font-medium font-['poppin'] leading-normal mt-4">
                Meaning /Pronounciation</p>
            <h1 class="opacity-80 justify-center text-zinc-900 text-xl font-semibold font-bn mt-4">
                "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h1>

            <div class="flex justify-between items-center gap-5 mt-15">
                <button onclick="my_modal_5.showModal()" class="card-btn  w-14 h-14 bg-sky-500/10 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="my_modal_5.showModal()" class="card-btn w-14 h-14 bg-sky-500/10 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
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

loadLessons();