// ==========================================IMAGE LOGIC START==========================================

const accessKey = "hnJscmArzcP9zk0tDlmtroBPmefLE0PTcEt19eN37FY";
let title = document.querySelector(".title");
let content = document.querySelector(".content");
let showImage = document.querySelector(".image");
let wikiLink = document.querySelector(".wikiLink");
let link = document.querySelector(".link");
async function fetchImage(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );
    const data = await response.json();
    logImageLink(data.results[0]);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
}

function logImageLink(image) {
  if (image) {
    console.log("Image URL:", image.urls.regular);

    showImage.style.backgroundImage = `url(${image.urls.regular})`;
  } else {
    console.log("No image found.");
  }
}

function searchImage() {
  const query = document.querySelector(".searchInput").value.trim();
  if (query) {
    fetchImage(query);
    searchDictionary();
  } else {
    title.style.color = "red";
    title.textContent = "Enter a search term";
    content.textContent = "";
    showImage.style.backgroundImage = "";
    wikiLink.textContent = dictionary.sourceUrls[0];
  }
}

// ==========================================IMAGE LOGIC END==========================================
// ==========================================DICTIONARY LOGIC START==========================================

async function fetchDictionary(word) {
  try {
    const response = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );
    const data = await response.json();
    logDictionary(data[0]);
  } catch (error) {
    console.error("Error fetching dictionary:", error);
  }
}

function logDictionary(dictionary) {
  if (dictionary) {
    title.style.color = "";
    title.textContent = dictionary.word;
    content.textContent = dictionary.meanings[0].definitions[0].definition;

    link.setAttribute("href", dictionary.sourceUrls[0]);
    wikiLink.innerHTML = `Learn More &#8594;`;
    console.log(dictionary);
  } else {
    console.log("No dictionary found.");

    title.style.color = "red";
    title.textContent = "Enter a valid search term";
    content.textContent = "";
    showImage.style.backgroundImage = "";
  }
}

function searchDictionary() {
  const word = document.querySelector(".searchInput").value.trim();
  if (word) {
    fetchDictionary(word);

    document.querySelector(".searchInput").value = "";
  } else {
    alert("Please enter a search term");
  }
}

// ==========================================DICTIONARY LOGIC END==========================================
