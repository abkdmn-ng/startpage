/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/mail":"gmail.com/","/youtube":"youtube.com/","/github":"github.com/"}
const engine = "ecosia"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Vpt6SxCvd3eD64qr","label":"basicNet","bookmarks":[{"id":"pYkdNwdk7siZ1hli","label":"Torrents","url":"https://boards.4chan.org/t/"},{"id":"wk5toisuU1Nih4Kh","label":"HIgh Resolution","url":"https://boards.4chan.org/hr/"},{"id":"JRSzulLvNw846t7X","label":"emails","url":"gmail.com"},{"id":"Bwaj6Bjkl3ZTqeAk","label":"Whatsapp Web","url":"web.whatsapp.com"}]},{"id":"Qqt1Vp7Sm00Z35nq","label":"ImageBoards","bookmarks":[{"id":"yycxYmLKovmi8tkF","label":"Wallpapers/General","url":"https://boards.4chan.org/wg/"},{"id":"M82cRhb8Z8btLVzT","label":"WorkSafe Gif","url":"https://boards.4chan.org/wsg/"},{"id":"hFTSjxV80eKnA30C","label":"Wallhaven","url":"https://wallhaven.cc/"},{"id":"LzyCc227TqZo2PRZ","label":"Gelbooru","url":"https://gelbooru.com/index.php?page=post&s=list&tags=all"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
