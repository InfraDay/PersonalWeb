$(document).ready(function() {
    const obj = $("#data-spinner");
    const dataList = obj.attr("data").split(", ");

    headerAnim(dataList, obj);
});

async function headerAnim(dataList, obj) {
    let i = 0;
    let step = 0;
    let maxStep = Math.floor(dataList[i].length / 2 + 1);
    let xHelp = Math.floor(dataList[i].length / 2);
    let current = dataList[i];

    while (true) {
        if (step === 0) {
            step++;

            obj.text(current);

            await wait(1500);
        } else if (step === maxStep) {
            i < dataList.length - 1 ? i++ : i = 0;
            current = dataList[i];
            step = 1;
            xHelp = Math.ceil(current.length / 2);

            await transform(obj.text(), current, obj);
            await wait(1000);
        } else if (current.lenth % 2 === 1) {
            current = current.substring(0, xHelp - step + 1) + genRandString(step * 2 - 1) + current.substring(xHelp + step);
            step++;

            obj.text(current);
            await wait(150);
        } else {
            current = current.substring(0, xHelp - step) + genRandString(step * 2) + current.substring(xHelp + step);
            step++;
            
            obj.text(current);
            await wait(150);
        };
    };
};

function genRandString(length = 1) {
    let result = "";

    for (let i = 0; i < length; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 93 + 33));
    };

    return result;
};

async function transform(prev, next, obj) {
    if (prev.length < next.length) {
        for (let i = prev.length; i <= next.length; i++) {
            obj.text(genRandString(i));
            await new Promise(resolve => setTimeout(resolve, 150));
        };
    } else if (prev.length > next.length) {
        for (let i = prev.length; i >= next.length; i--) {
            obj.text(genRandString(i));
            await new Promise(resolve => setTimeout(resolve, 150));
        }
    };

    obj.text(next);
};

async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};