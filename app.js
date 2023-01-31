const keyPad = document.querySelector(".keypad");
const error = document.querySelector(".error");

keyPad.onclick = () => {
    navigator.clipboard.writeText(keyPad.value);
};

document.querySelectorAll("[data-num], [data-op]").forEach(btn => {
    btn.onclick = () => {
        keyPad.value += btn.textContent;
    }
});

document.querySelector("[data-reset]").onclick = () => {
    keyPad.value = "";
};

document.querySelector("[data-del]").onclick = () => {
    keyPad.value = keyPad.value.slice(0, -1);
};

document.querySelector("[data-equal]").onclick = () => {
    if (keyPad.value.includes("÷0")) {
        error.innerHTML = `
        Can't divide by zero
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
        `;
        error.style.top = "30px";
        setTimeout(() => {
            error.style.top = "-100px";
        }, 2000)
        return 1;
    }
    
    try {
        keyPad.value = eval(keyPad.value.replace(/×/g, "*").replace(/÷/g, "/").replace(/\-\-/g, "+"));
    } catch {
        error.innerHTML = `
        Syntax Error
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
        `;
        error.style.top = "30px";
        setTimeout(() => {
            error.style.top = "-100px";
        }, 2000)
    }
};