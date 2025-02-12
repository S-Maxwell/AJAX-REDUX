(() => {
    const charBox = document.querySelector("#people-box");
    const videoTemplate = document.querySelector("#video-template");
    const videoCon = document.querySelector("#video-con");
    const baseUrl = "https://swapi.dev/api/";
   
    function getChars() {
        fetch(`${baseUrl}people/?page=2`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const peopleStarWars = data.results;
            const ul = document.createElement("ul");

            peopleStarWars.forEach(person => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = person.name;
                const img = document.createElement("img");
                img.src = `images/${person.name}.png`;
                img.classList.add("char-image");

                
                if (person.films.length > 0) {
                    a.dataset.film = person.films[0]; 
                }

                li.appendChild(a);
                ul.appendChild(li);
                ul.appendChild(img);
            });

            charBox.appendChild(ul);
        })
        .then(() => {
            document.querySelectorAll("#people-box li a").forEach(link => {
                link.addEventListener("click", getMovies);
            });
        })
        .catch(function(error) {
            charBox.innerHTML = `<p>Error Fetching characters List</p>`;
            charBox.appendChild(img);
            console.log(error);
        });
    }

    function getMovies(e) {
        console.log("Movies Called Successfully");
        
        const filmUrl = e.currentTarget.dataset.film; 
        console.log(filmUrl);
        videoCon.innerHTML = "";

        if (!filmUrl) {
            videoCon.innerHTML = `<p>No film available</p>`;
            return;
        }

        fetch(filmUrl)
        .then(response => response.json())
        .then(function(response) {
        console.log(response.title);
        const clone = videoTemplate.content.cloneNode(true);
        const videoHead = clone.querySelector(".video-head");
        const videoInfo = clone.querySelector(".video-info");
        const videoImage = clone.querySelector(".video-image");
        const videoDirector = clone.querySelector(".video-director");

        videoHead.textContent = response.title;
        videoInfo.innerHTML = response.opening_crawl; 
    videoDirector.innerHTML = `${response.director}`;

   videoImage.src = `images/${response.title}.jpg`;
      videoImage.alt = `${response.title} Poster`;

    videoCon.appendChild(clone);
        })
        .catch(function(error) {
            videoCon.innerHTML = `<p>Error Fetching Movie Details</p>`;
            videoCon.appendChild(img);
            console.log(error);
        });
    }

    getChars();
})();
