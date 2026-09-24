const mainForm = document.getElementById("mainForm")
const inputMain = document.getElementById("inputMain")
const cards = document.querySelector(".cards")
let isLoading = false;
mainForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const input = e.target.elements.inputMain.value
    cards.innerHTML = "";
    console.log("input" + input)
    try {
        isLoading = true
        let response = await fetch(`https://dattebayo-api.onrender.com/characters?name=${input}`)

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

  
})

function renderUi(data) {

    data.characters.filter(data => {
        const card = document.createElement("div")
        const name = document.createElement("p")
        const clan = document.createElement("p")
        const img = document.createElement("img")
        // console.log(data.images[0])
        name.textContent = `${data.name} `
        clan.textContent = ` ${data.personal.clan ? data.personal.clan : "No Clan"} `;
        img.src = data.images[0] ? `${data.images[0]}` : `asset/main.svg`

        console.log(data)
        card.classList.add("card")
        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(clan)
        cards.appendChild(card)
    })

}
