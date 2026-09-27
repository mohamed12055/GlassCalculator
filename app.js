"use strict";


const operation =
    document.getElementById("operation");

const normalMode =
    document.getElementById("normalMode");

const glassMode =
    document.getElementById("glassMode");

const numberInput =
    document.getElementById("numberInput");

const constantInput =
    document.getElementById("constantInput");

const lengthInput =
    document.getElementById("lengthInput");

const widthInput =
    document.getElementById("widthInput");

const piecesInput =
    document.getElementById("piecesInput");

const priceInput =
    document.getElementById("priceInput");

const result =
    document.getElementById("result");

const formula =
    document.getElementById("formula");


function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "غير صالح";
    }

    return Number(
        number.toFixed(10)
    ).toLocaleString("ar-EG", {
        maximumFractionDigits: 10
    });
}


/* تغيير نوع العملية */

function updateMode() {

    if (operation.value === "multiply") {

        normalMode.classList.add("hidden");

        glassMode.classList.remove("hidden");

        calculateGlass();

    } else {

        glassMode.classList.add("hidden");

        normalMode.classList.remove("hidden");

        calculateNormal();
    }
}


/* حاسبة الزجاج */

function calculateGlass() {

    if (
        lengthInput.value === "" ||
        widthInput.value === "" ||
        piecesInput.value === "" ||
        priceInput.value === ""
    ) {

        result.textContent = "—";

        formula.textContent =
            "أدخل الطول والعرض وعدد القطع والسعر";

        return;
    }


    const length =
        Number(lengthInput.value);

    const width =
        Number(widthInput.value);

    const pieces =
        Number(piecesInput.value);

    const price =
        Number(priceInput.value);


    if (
        !Number.isFinite(length) ||
        !Number.isFinite(width) ||
        !Number.isFinite(pieces) ||
        !Number.isFinite(price)
    ) {

        result.textContent = "غير صالح";

        formula.textContent =
            "تأكد من البيانات المدخلة";

        return;
    }


    if (
        length <= 0 ||
        width <= 0 ||
        pieces <= 0 ||
        price < 0
    ) {

        result.textContent = "—";

        formula.textContent =
            "تأكد أن القيم صحيحة";

        return;
    }


    const lengthMeter =
        length / 100;

    const widthMeter =
        width / 100;


    const area =
        lengthMeter * widthMeter;


    const total =
        area * pieces * price;


    result.textContent =
        formatNumber(total) + " جنيه";


    formula.textContent =
        `${formatNumber(length)} سم × ` +
        `${formatNumber(width)} سم × ` +
        `${formatNumber(pieces)} قطعة × ` +
        `${formatNumber(price)} جنيه/م²`;
}


/* العمليات العادية */

function calculateNormal() {

    if (
        numberInput.value === "" ||
        constantInput.value === ""
    ) {

        result.textContent = "—";

        formula.textContent =
            "اكتب الرقم والرقم الثابت";

        return;
    }


    const number =
        Number(numberInput.value);

    const constant =
        Number(constantInput.value);


    if (
        !Number.isFinite(number) ||
        !Number.isFinite(constant)
    ) {

        result.textContent = "غير صالح";

        formula.textContent =
            "تأكد من الأرقام المدخلة";

        return;
    }


    let answer;
    let symbol;


    if (operation.value === "subtract") {

        answer = number - constant;

        symbol = "−";

    } else if (operation.value === "add") {

        answer = number + constant;

        symbol = "+";

    } else if (operation.value === "divide") {

        if (constant === 0) {

            result.textContent =
                "لا يمكن القسمة على صفر";

            formula.textContent =
                "غيّر الرقم الثابت";

            return;
        }

        answer = number / constant;

        symbol = "÷";
    }


    result.textContent =
        formatNumber(answer);


    formula.textContent =
        `${formatNumber(number)} ${symbol} ` +
        `${formatNumber(constant)} = ` +
        `${formatNumber(answer)}`;
}


/* الأحداث */

operation.addEventListener(
    "change",
    updateMode
);

numberInput.addEventListener(
    "input",
    calculateNormal
);

constantInput.addEventListener(
    "input",
    calculateNormal
);

lengthInput.addEventListener(
    "input",
    calculateGlass
);

widthInput.addEventListener(
    "input",
    calculateGlass
);

piecesInput.addEventListener(
    "input",
    calculateGlass
);

priceInput.addEventListener(
    "input",
    calculateGlass
);


/* التشغيل */

updateMode();