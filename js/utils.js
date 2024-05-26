export const getName = "annlys";

export function getIdParamFromUrl() {
    const currentUrl = window.location.href;
    const urlParam = new URLSearchParams(new URL(currentUrl).search);

    if(urlParam.has("id")) {
        return urlParam.get("id");
    } else {
        return null;
    }
}

export function redirectToPost(id) {
    location.href = `../post/index.html?id=${id}`;
}

export function redirectToMakePost() {
    location.href = `../post/make.html`;
}

export function redirectToEditPost(id) {
    location.href = `../post/edit.html?id=${id}`;
}

export function refactorDate(isoDateString)  {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
