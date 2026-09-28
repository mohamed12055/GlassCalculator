"use strict";


/* =========================
   عناصر الحاسبة
========================= */

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


/* =========================
   عناصر الحافظة
========================= */

const clipboardToggle =
    document.getElementById("clipboardToggle");

const clipboardPanel =
    document.getElementById("clipboardPanel");

const clipboardClose =
    document.getElementById("clipboardClose");

const saveCalculationBtn =
    document.getElementById("saveCalculationBtn");

const noteInput =
    document.getElementById("noteInput");

const savedCalculations =
    document.getElementById("savedCalculations");


/* =========================
   تنسيق الأرقام
========================= */

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


/* =========================
   تغيير نوع العملية
========================= */

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


/* =========================
   حاسبة السعر
   لا علاقة لها بالحافظة
========================= */

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


/* =========================
   العمليات العادية
========================= */

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


    /* الطرح */

    if (operation.value === "subtract") {

        answer =
            number - constant;

        symbol =
            "−";
    }


    /* الجمع */

    else if (operation.value === "add") {

        answer =
            number + constant;

        symbol =
            "+";
    }


    /* القسمة */

    else if (operation.value === "divide") {

        if (constant === 0) {

            result.textContent =
                "لا يمكن القسمة على صفر";

            formula.textContent =
                "غيّر الرقم الثابت";

            return;
        }

        answer =
            number / constant;

        symbol =
            "÷";
    }


    result.textContent =
        formatNumber(answer);


    formula.textContent =
        `${formatNumber(number)} ${symbol} ` +
        `${formatNumber(constant)} = ` +
        `${formatNumber(answer)}`;
}


/* =========================
   الحافظة المستقلة
========================= */

function getSavedNotes() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "bdawyGlassNotes"
            )
        ) || [];

    } catch {

        return [];
    }
}


/* =========================
   حماية النص المكتوب
========================= */

function escapeHtml(text) {

    return text.replace(
        /[&<>"']/g,
        character => {

            const entities = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return entities[character];
        }
    );
}


/* =========================
   حفظ الملاحظة
========================= */

function saveNote() {

    const text =
        noteInput.value.trim();


    if (!text) {

        alert(
            "اكتب ملاحظة أولًا"
        );

        return;
    }


    const notes =
        getSavedNotes();


    const note = {

        id: Date.now(),

        text: text
    };


    notes.unshift(note);


    localStorage.setItem(
        "bdawyGlassNotes",
        JSON.stringify(notes)
    );


    noteInput.value = "";


    renderSavedNotes();


    alert(
        "تم حفظ الملاحظة بنجاح ✅"
    );
}


/* =========================
   حذف ملاحظة
========================= */

function deleteNote(id) {

    const notes =
        getSavedNotes().filter(
            note => note.id !== id
        );


    localStorage.setItem(
        "bdawyGlassNotes",
        JSON.stringify(notes)
    );


    renderSavedNotes();
}


/* =========================
   عرض الملاحظات
========================= */

function renderSavedNotes() {

    const notes =
        getSavedNotes();


    if (notes.length === 0) {

        savedCalculations.innerHTML = `
            <p class="empty-saved">
                لا توجد ملاحظات محفوظة
            </p>
        `;

        return;
    }


    savedCalculations.innerHTML =
        notes.map(note => `

            <div class="saved-card">

                <div class="saved-card-header">

                    <strong>
                        ${escapeHtml(note.text)}
                    </strong>

                    <button
                        type="button"
                        class="delete-saved"
                        data-id="${note.id}"
                    >
                        🗑️
                    </button>

                </div>

            </div>

        `).join("");


    document
        .querySelectorAll(".delete-saved")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteNote(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });
}


/* =========================
   فتح الحافظة
========================= */

clipboardToggle.addEventListener(
    "click",
    () => {

        clipboardPanel.classList.add(
            "open"
        );

        clipboardPanel.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/* =========================
   إغلاق الحافظة
========================= */

clipboardClose.addEventListener(
    "click",
    () => {

        clipboardPanel.classList.remove(
            "open"
        );

        clipboardPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }
);


/* =========================
   زر حفظ الملاحظة
========================= */

saveCalculationBtn.addEventListener(
    "click",
    saveNote
);


/* =========================
   أحداث الحاسبة
========================= */

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


/* =========================
   تشغيل الحاسبة والحافظة
========================= */

updateMode();

renderSavedNotes();


/* =========================
   اختبار
========================= */

console.log(
    "BDAWY TEST - app.js يعمل"
);