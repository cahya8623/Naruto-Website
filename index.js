const mainForm = document.getElementById("mainForm")
const inputMain = document.getElementById("inputMain")
const cards = document.querySelector(".cards")
let isLoading = false;
let page = 1

console.log(page)

async function fetchData(query = "") {
    if (isLoading) return;
    try {
        isLoading = true
        let url = query === "" ? `https://dattebayo-api.onrender.com/characters?page=${page}`
            : `https://dattebayo-api.onrender.com/characters?name=${query}`
        let response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()



        renderUi(data)
        console.dir(data)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading = false

    }

}
mainForm.addEventListener("submit", (e) => {
    e.preventDefault();


    const input = inputMain.value
    fetchData(input)


})

function renderUi(data) {

    data.characters.filter(data => {
        const card = document.createElement("div")
        const name = document.createElement("p")
        const clan = document.createElement("p")
        const img = document.createElement("img")
        name.textContent = `${data.name} `
        clan.textContent = ` ${data.personal.clan ? data.personal.clan : "No Clan"} `;
        img.src = data.images[0] ? `${data.images[0]}` : `asset/main.svg`

        card.classList.add("card")
        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(clan)
        cards.appendChild(card)
    })

}
window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        page++
        fetchData()
    }
})
fetchData()
