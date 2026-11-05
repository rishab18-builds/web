// UPI SIMULATOR - DEMO

/* ==================================
   PAYSAFE - INTERACTIVE UPI SIMULATOR
================================== */

const openSimulator = document.getElementById("openSimulator");
const simulatorResult = document.getElementById("simulator-result");

openSimulator.addEventListener("click", () => {

    simulatorResult.innerHTML = `
        <div class="payment-form">

            <h3 style="margin-bottom:20px;">Demo Payment</h3>

            <label for="receiver">Select Receiver</label>

            <select id="receiver" style="width:100%; padding:13px; margin:10px 0 20px; border-radius:8px;">
                <option value="Rahul Sharma">Rahul Sharma</option>
                <option value="Priya Verma">Priya Verma</option>
                <option value="Amit Kumar">Amit Kumar</option>
            </select>

            <label for="paymentAmount">Enter Amount (₹)</label>

            <input
                type="number"
                id="paymentAmount"
                placeholder="Example: 500"
                min="1"
                max="50000"
                style="width:100%; padding:13px; margin:10px 0 20px; border-radius:8px;"
            >

            <button id="reviewPayment" class="primary-btn">
                Review Payment →
            </button>

            <p style="margin-top:18px; font-size:11px;">
                Educational simulation only. No real transaction.
            </p>

        </div>
    `;

    document.getElementById("reviewPayment").addEventListener("click", () => {

        const receiver = document.getElementById("receiver").value;
        const amount = Number(document.getElementById("paymentAmount").value);

        if (!Number.isFinite(amount) || amount < 1 || amount > 50000) {
            alert("Please enter an amount between ₹1 and ₹50,000.");
            return;
        }

        simulatorResult.innerHTML = `
            <div style="margin-top:25px; padding:25px; background:rgba(37,217,232,0.08); border-radius:12px;">

                <h3 style="color:#25d9e8;">Review Your Payment</h3>

                <p>Receiver: <strong>${receiver}</strong></p>

                <h2 style="font-size:35px; margin:15px;">
                    ₹${amount.toLocaleString("en-IN")}
                </h2>

                <p style="font-size:12px;">
                    Check the receiver and amount before confirming.
                </p>

                <button id="confirmPayment" class="primary-btn">
                    Confirm Demo Payment
                </button>

                <button id="cancelPayment" class="secondary-btn">
                    Cancel
                </button>

            </div>
        `;

        document.getElementById("confirmPayment").addEventListener("click", () => {

            const transactionId = "DEMO" + Date.now().toString().slice(-8);

            simulatorResult.innerHTML = `
                <div style="margin-top:25px; padding:25px; background:rgba(45,227,155,0.10); border-radius:12px;">

                    <div style="font-size:50px;">✅</div>

                    <h2 style="color:#2de39b;">Demo Successful!</h2>

                    <h1 style="font-size:35px; margin:15px;">
                        ₹${amount.toLocaleString("en-IN")}
                    </h1>

                    <p>Receiver: ${receiver}</p>

                    <p style="margin-top:10px;">
                        Demo Transaction ID:
                    </p>

                    <strong>${transactionId}</strong>

                    <p style="margin-top:15px; font-size:12px;">
                        This is a simulated transaction. No money was transferred.
                    </p>

                    <button id="newPayment" class="primary-btn" style="margin-top:20px;">
                        Try Again ↻
                    </button>

                </div>
            `;

            document.getElementById("newPayment").addEventListener("click", () => {
                openSimulator.click();
            });

        });

        document.getElementById("cancelPayment").addEventListener("click", () => {
            openSimulator.click();
        });

    });

});

/* ==================================
   PAYSAFE - 10 QUESTIONS QUIZ
================================== */

const quizQuestions = [
    {
        question: "What does UPI stand for?",
        options: [
            "Unified Payments Interface",
            "Universal Payment India",
            "United Payment Internet",
            "Unique Personal Identity"
        ],
        answer: 0,
        explanation: "UPI stands for Unified Payments Interface."
    },
    {
        question: "Should you share your UPI PIN with anyone?",
        options: [
            "Yes, with friends",
            "Yes, with bank staff",
            "No, never",
            "Only on phone calls"
        ],
        answer: 2,
        explanation: "Never share your UPI PIN with anyone."
    },
    {
        question: "What should you do before scanning a QR code?",
        options: [
            "Scan every QR code",
            "Verify the source and purpose",
            "Share your OTP",
            "Enter your PIN immediately"
        ],
        answer: 1,
        explanation: "Always verify the QR code and payment details."
    },
    {
        question: "Can you receive money by entering your UPI PIN?",
        options: [
            "Yes, always",
            "Yes, for cashback",
            "No",
            "Only from unknown people"
        ],
        answer: 2,
        explanation: "Entering your UPI PIN authorizes a payment, not receiving money."
    },
    {
        question: "What is phishing?",
        options: [
            "A payment app",
            "A type of online fraud",
            "A banking service",
            "A security update"
        ],
        answer: 1,
        explanation: "Phishing tricks people into sharing confidential information."
    },
    {
        question: "You receive an unknown cashback link. What should you do?",
        options: [
            "Click immediately",
            "Share it with friends",
            "Enter bank details",
            "Avoid the link and verify the offer"
        ],
        answer: 3,
        explanation: "Unknown reward links can lead to fraudulent websites."
    },
    {
        question: "What is an OTP?",
        options: [
            "One Time Password",
            "Online Transfer Payment",
            "Official Transaction Process",
            "One Transfer PIN"
        ],
        answer: 0,
        explanation: "OTP means One Time Password. Never share it with others."
    },
    {
        question: "How should you verify a successful payment?",
        options: [
            "Trust a screenshot",
            "Trust a message from a stranger",
            "Check your official payment app",
            "Ask an unknown person"
        ],
        answer: 2,
        explanation: "Always verify payment status inside your official payment app."
    },
    {
        question: "What should you do if you notice an unauthorized transaction?",
        options: [
            "Ignore it",
            "Report it immediately to your bank",
            "Share your PIN",
            "Wait several months"
        ],
        answer: 1,
        explanation: "Contact your bank immediately and report the transaction through official channels."
    },
    {
        question: "Which is the safest digital payment habit?",
        options: [
            "Sharing OTPs",
            "Clicking unknown links",
            "Ignoring transaction alerts",
            "Checking receiver details before paying"
        ],
        answer: 3,
        explanation: "Always verify the receiver and amount before confirming a payment."
    }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const quizContent = document.getElementById("quiz-content");

document.getElementById("startQuiz").addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    showQuizQuestion();

});

function showQuizQuestion() {

    if (quizIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const q = quizQuestions[quizIndex];

    const progress = ((quizIndex + 1) / quizQuestions.length) * 100;

    quizContent.innerHTML = `
        <div style="margin-top:30px; text-align:left;">

            <div style="display:flex; justify-content:space-between;">
                <span>Question ${quizIndex + 1}/10</span>
                <span>Score: ${quizScore}</span>
            </div>

            <div style="height:8px; background:#26344b; border-radius:20px; margin:15px 0 25px;">
                <div style="height:8px; width:${progress}%; background:#25d9e8; border-radius:20px;"></div>
            </div>

            <h3 style="font-size:19px; margin-bottom:20px;">
                ${q.question}
            </h3>

            <div id="quiz-options">
                ${q.options.map((option, index) => `
                    <button class="quiz-option" data-index="${index}"
                    style="display:block; width:100%; padding:14px; margin:10px 0; text-align:left; background:#1b2b45; color:white; border:1px solid #344660; border-radius:9px;">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                `).join("")}
            </div>

            <div id="quiz-feedback" style="margin-top:20px;"></div>

        </div>
    `;

    document.querySelectorAll(".quiz-option").forEach(button => {

        button.addEventListener("click", () => {

            if (quizAnswered) return;

            quizAnswered = true;

            const selected = Number(button.dataset.index);
            const correct = selected === q.answer;

            if (correct) quizScore++;

            document.querySelectorAll(".quiz-option").forEach(option => {
                option.disabled = true;

                if (Number(option.dataset.index) === q.answer) {
                    option.style.border = "2px solid #2de39b";
                }
            });

            if (!correct) {
                button.style.border = "2px solid #ff7585";
            }

            document.getElementById("quiz-feedback").innerHTML = `
                <div style="padding:18px; background:${correct ? 'rgba(45,227,155,0.12)' : 'rgba(255,117,133,0.12)'}; border-radius:10px;">

                    <h3 style="color:${correct ? '#2de39b' : '#ff7585'};">
                        ${correct ? 'Correct Answer!' : 'Incorrect Answer!'}
                    </h3>

                    <p style="margin-top:10px;">${q.explanation}</p>

                    <button id="nextQuiz" class="primary-btn" style="margin-top:18px;">
                        ${quizIndex === 9 ? 'View Result →' : 'Next Question →'}
                    </button>

                </div>
            `;

            document.getElementById("nextQuiz").addEventListener("click", () => {
                quizIndex++;
                quizAnswered = false;
                showQuizQuestion();
            });

        });

    });

}

function showQuizResult() {

    let performance;

    if (quizScore >= 8) {
        performance = "Excellent! Your digital payment awareness is strong.";
    } else if (quizScore >= 5) {
        performance = "Good job! Keep improving your safety knowledge.";
    } else {
        performance = "Keep learning! Practice digital payment safety.";
    }

    quizContent.innerHTML = `
        <div style="margin-top:30px; padding:25px; background:rgba(37,217,232,0.08); border-radius:15px;">

            <div style="font-size:50px;">🏆</div>

            <h2>Quiz Completed!</h2>

            <h1 style="font-size:55px; color:#25d9e8; margin:15px;">
                ${quizScore}/10
            </h1>

            <p>${performance}</p>

            <button id="restartQuiz" class="primary-btn" style="margin-top:20px;">
                Try Again ↻
            </button>

        </div>
    `;

    document.getElementById("restartQuiz").addEventListener("click", () => {
        quizIndex = 0;
        quizScore = 0;
        quizAnswered = false;
        showQuizQuestion();
    });

}

// ==================================
// PAYSAFE - HINDI / ENGLISH SWITCH
// ==================================

const languageButton = document.createElement("button");

languageButton.id = "languageToggle";
languageButton.textContent = "🇮🇳 हिंदी";

languageButton.style.cssText = `
    padding: 9px 12px;
    border-radius: 10px;
    background: #121f35;
    color: white;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    font-weight: 600;
    margin-right: 8px;
`;

document.getElementById("themeToggle")
    .insertAdjacentElement("beforebegin", languageButton);

const translations = {
    "en": {
        ".navbar nav a": [
            "Home", "Scam Game", "UPI Simulator", "Safety Tips"
        ],
        ".hero-content .tagline": [
            "YOUR DIGITAL SAFETY PARTNER"
        ],
        ".hero-description": [
            "Learn about digital payment safety, identify online scams and protect yourself from payment fraud."
        ],
        ".hero-buttons a": [
            "Play Scam Game →", "Explore Safety"
        ],
        ".hero-card h2": [
            "Your Money. Your Security."
        ],
        ".hero-card > p": [
            "Think Before You Pay."
        ],
        ".section-heading .tagline": [
            "WHAT YOU WILL LEARN",
            "INTERACTIVE LEARNING",
            "SAFE LEARNING DEMO",
            "TEST YOUR KNOWLEDGE",
            "STAY ALERT"
        ],
        ".section-heading h2": [
            "Explore PaySafe Features",
            "Can You Spot The Scam?",
            "UPI Payment Simulator",
            "Digital Safety Quiz",
            "QR Code Safety Guide"
        ],
        ".section-heading > p:last-child": [
            "Simple tools to help you understand digital payment safety.",
            "Test your ability to identify suspicious payment messages.",
            "Practice understanding a payment flow without real money.",
            "Check how much you know about online payment safety.",
            "Remember these safety rules before making digital payments."
        ],
        ".feature-card h3": [
            "Scam Awareness Game",
            "UPI Simulator",
            "Knowledge Quiz",
            "QR Code Safety"
        ],
        ".feature-card p": [
            "Identify suspicious messages and learn to avoid payment scams.",
            "Understand how a digital payment works through a safe demo.",
            "Test your digital payment safety knowledge.",
            "Learn important precautions before scanning QR codes."
        ],
        ".feature-card a": [
            "Play Game →", "Explore →", "Start Quiz →", "Learn More →"
        ],
        ".simulator-card > h3": ["Demo Payment"],
        ".simulator-card > p": [
            "This is an educational simulation. No actual transaction will happen."
        ],
        ".quiz-card > h3": [
            "Are you ready for the challenge?"
        ],
        ".quiz-card > p": [
            "10 questions will test your digital payment awareness."
        ],
        ".safety-card h3": [
            "Check the Receiver", "Never Share PIN", "Be Careful"
        ],
        ".safety-card p": [
            "Always verify the receiver's name before approving payment.",
            "Never share your UPI PIN, OTP or confidential details.",
            "Scanning a QR code to receive money is not required."
        ]
    },

    "hi": {
        ".navbar nav a": [
            "होम", "स्कैम गेम", "UPI सिम्युलेटर", "सुरक्षा टिप्स"
        ],
        ".hero-content .tagline": [
            "आपका डिजिटल सुरक्षा साथी"
        ],
        ".hero-description": [
            "डिजिटल पेमेंट की सुरक्षा सीखें, ऑनलाइन धोखाधड़ी पहचानें और अपने पैसों को सुरक्षित रखें।"
        ],
        ".hero-buttons a": [
            "स्कैम गेम खेलें →", "सुरक्षा जानें"
        ],
        ".hero-card h2": [
            "आपका पैसा, आपकी सुरक्षा।"
        ],
        ".hero-card > p": [
            "पेमेंट करने से पहले सोचें।"
        ],
        ".section-heading .tagline": [
            "आप क्या सीखेंगे",
            "इंटरैक्टिव लर्निंग",
            "सुरक्षित डेमो",
            "अपना ज्ञान परखें",
            "सतर्क रहें"
        ],
        ".section-heading h2": [
            "PaySafe के फीचर्स देखें",
            "क्या आप स्कैम पहचान सकते हैं?",
            "UPI पेमेंट सिम्युलेटर",
            "डिजिटल सुरक्षा क्विज़",
            "QR कोड सुरक्षा गाइड"
        ],
        ".section-heading > p:last-child": [
            "डिजिटल पेमेंट की सुरक्षा समझने के आसान टूल्स।",
            "संदिग्ध पेमेंट मैसेज पहचानने की अपनी क्षमता परखें।",
            "बिना असली पैसे के पेमेंट की प्रक्रिया समझें।",
            "ऑनलाइन पेमेंट सुरक्षा के बारे में अपना ज्ञान परखें।",
            "डिजिटल पेमेंट से पहले इन सुरक्षा नियमों को याद रखें।"
        ],
        ".feature-card h3": [
            "स्कैम पहचान गेम",
            "UPI सिम्युलेटर",
            "ज्ञान क्विज़",
            "QR कोड सुरक्षा"
        ],
        ".feature-card p": [
            "संदिग्ध मैसेज पहचानें और पेमेंट स्कैम से बचना सीखें।",
            "सुरक्षित डेमो से डिजिटल पेमेंट की प्रक्रिया समझें।",
            "डिजिटल पेमेंट सुरक्षा का अपना ज्ञान परखें।",
            "QR कोड स्कैन करने से पहले जरूरी सावधानियां सीखें।"
        ],
        ".feature-card a": [
            "गेम खेलें →", "देखें →", "क्विज़ शुरू करें →", "और जानें →"
        ],
        ".simulator-card > h3": ["डेमो पेमेंट"],
        ".simulator-card > p": [
            "यह केवल सीखने के लिए बनाया गया डेमो है। कोई असली ट्रांजैक्शन नहीं होगा।"
        ],
        ".quiz-card > h3": [
            "क्या आप इस चुनौती के लिए तैयार हैं?"
        ],
        ".quiz-card > p": [
            "10 सवाल आपके डिजिटल पेमेंट के ज्ञान को परखेंगे।"
        ],
        ".safety-card h3": [
            "पाने वाले का नाम जांचें", "PIN कभी शेयर न करें", "सावधान रहें"
        ],
        ".safety-card p": [
            "पेमेंट करने से पहले पाने वाले का नाम जरूर जांचें।",
            "अपना UPI PIN, OTP या निजी जानकारी किसी को न बताएं।",
            "पैसे पाने के लिए QR कोड स्कैन करना जरूरी नहीं है।"
        ]
    }
};

let currentLanguage = "en";

function changeLanguage() {

    currentLanguage = currentLanguage === "en" ? "hi" : "en";

    const selectedTranslations = translations[currentLanguage];

    for (const selector in selectedTranslations) {

        const elements = document.querySelectorAll(selector);
        const texts = selectedTranslations[selector];

        elements.forEach((element, index) => {

            if (texts[index] !== undefined) {
                element.textContent = texts[index];
            }

        });
    }

    languageButton.textContent =
        currentLanguage === "en" ? "🇮🇳 हिंदी" : "🇬🇧 English";
}

languageButton.addEventListener("click", changeLanguage);
// Refresh game text after language change

if (typeof showQuestion === "function") {
    if (gameContent && gameContent.querySelector(".game-options")) {
        showQuestion();
    }
}

// ==================================
// PAYSAFE - ANIMATED STATISTICS
// ==================================

const counters = document.querySelectorAll(".counter");

function animateCounters() {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);
        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 50));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            counter.textContent = current;

        }, 30);

    });

}

let statisticsStarted = false;

const statsSection = document.getElementById("statistics");

const statsObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting && !statisticsStarted) {

            statisticsStarted = true;
            animateCounters();

            statsObserver.disconnect();

        }

    });

});

statsObserver.observe(statsSection);


// ==================================
// PAYSAFE - DOWNLOAD CHECKLIST
// ==================================

function downloadChecklist()
 {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        alert("Please allow pop-ups for this website.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>PaySafe - Safety Checklist</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 35px;
                    color: #17233b;
                    line-height: 1.7;
                }

                h1 {
                    color: #087ee8;
                    text-align: center;
                }

                h2 {
                    color: #087ee8;
                    margin-top: 25px;
                }

                .item {
                    padding: 9px;
                    border-bottom: 1px solid #ddd;
                }

                .footer {
                    margin-top: 35px;
                    border-top: 1px solid #ddd;
                    padding-top: 15px;
                    font-size: 13px;
                    text-align: center;
                }

                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>

        <body>
            <h1>PaySafe</h1>
            <h2>Digital Payment Safety Checklist</h2>

            <p>Follow these safety rules to protect yourself from online payment fraud.</p>

            <h2>UPI Safety</h2>
            <div class="item">☐ Never share your UPI PIN or OTP.</div>
            <div class="item">☐ Check the receiver's name before paying.</div>
            <div class="item">☐ Remember: You do not need a PIN to receive money.</div>
            <div class="item">☐ Never approve an unknown collect request.</div>

            <h2>Online Safety</h2>
            <div class="item">☐ Never click suspicious payment links.</div>
            <div class="item">☐ Avoid scanning unknown QR codes.</div>
            <div class="item">☐ Never install unknown screen-sharing apps.</div>
            <div class="item">☐ Report suspicious transactions to your bank immediately.</div>

            <div class="footer">
                <strong>Project:</strong> PaySafe – Digital Payment Awareness<br>
                <strong>Developed by:</strong> Rishab Kripashankar Sharma<br>
                Terna Engineering College | B.Tech AI & DS | 2026–2027
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}
document.getElementById("downloadChecklist")?.addEventListener("click", downloadChecklist);
// DARK / LIGHT MODE TOGGLE

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeToggle.textContent = "🌙 Dark Mode";
        } else {
            themeToggle.textContent = "☀️ Light Mode";
        }
    });
}
// PAYSAFE SCAM AWARENESS GAME

const startGame = document.getElementById("startGame");
const gameContent = document.getElementById("game-content");

const scamQuestions = [
    {
        question: {
            en: "You receive a message saying your bank account will be blocked. What should you do?",
            hi: "आपको मैसेज मिलता है कि आपका बैंक खाता बंद हो जाएगा। आपको क्या करना चाहिए?"
        },
        options: [
            { en: "Click the link immediately", hi: "तुरंत लिंक पर क्लिक करें" },
            { en: "Ignore the link and contact your bank officially", hi: "लिंक को नजरअंदाज करें और बैंक से आधिकारिक तरीके से संपर्क करें" },
            { en: "Share your OTP", hi: "अपना OTP बताएं" }
        ],
        answer: 1,
        explanation: {
            en: "Banks never ask you to share your OTP through unknown links.",
            hi: "बैंक कभी भी अनजान लिंक के जरिए आपका OTP नहीं मांगते।"
        }
    },
    {
        question: {
            en: "A stranger asks for your UPI PIN to send you money. What should you do?",
            hi: "एक अनजान व्यक्ति पैसे भेजने के लिए आपका UPI PIN मांगता है। आपको क्या करना चाहिए?"
        },
        options: [
            { en: "Share your UPI PIN", hi: "अपना UPI PIN बता दें" },
            { en: "Enter your PIN", hi: "अपना PIN डालें" },
            { en: "Never share your UPI PIN", hi: "अपना UPI PIN कभी साझा न करें" }
        ],
        answer: 2,
        explanation: {
            en: "You never need to enter your UPI PIN to receive money.",
            hi: "पैसे प्राप्त करने के लिए कभी भी UPI PIN डालने की जरूरत नहीं होती।"
        }
    },
    {
        question: {
            en: "An unknown person sends you a QR code to claim a prize.",
            hi: "एक अनजान व्यक्ति आपको इनाम पाने के लिए QR कोड भेजता है।"
        },
        options: [
            { en: "Scan it immediately", hi: "तुरंत स्कैन करें" },
            { en: "Avoid scanning unknown QR codes", hi: "अनजान QR कोड स्कैन न करें" },
            { en: "Share your bank details", hi: "बैंक की जानकारी साझा करें" }
        ],
        answer: 1,
        explanation: {
            en: "Unknown QR codes may lead to unsafe payment requests or websites.",
            hi: "अनजान QR कोड आपको संदिग्ध पेमेंट रिक्वेस्ट या वेबसाइट पर ले जा सकते हैं।"
        }
    },
    {
        question: {
            en: "Someone offers you a job but asks for a registration fee first.",
            hi: "कोई आपको नौकरी देने का वादा करता है, लेकिन पहले रजिस्ट्रेशन फीस मांगता है।"
        },
        options: [
            { en: "Pay immediately", hi: "तुरंत पैसे दें" },
            { en: "Verify the company first", hi: "पहले कंपनी की जांच करें" },
            { en: "Share your OTP", hi: "अपना OTP बताएं" }
        ],
        answer: 1,
        explanation: {
            en: "Always verify a company before paying any registration fee.",
            hi: "कोई भी रजिस्ट्रेशन फीस देने से पहले कंपनी की जांच जरूर करें।"
        }
    },
    {
        question: {
            en: "You receive an unexpected payment request on your UPI app.",
            hi: "आपके UPI ऐप पर अचानक पैसे भेजने की रिक्वेस्ट आती है।"
        },
        options: [
            { en: "Approve without checking", hi: "बिना जांच किए स्वीकार करें" },
            { en: "Check the sender and purpose", hi: "भेजने वाले और रिक्वेस्ट की जांच करें" },
            { en: "Share your PIN", hi: "अपना PIN बताएं" }
        ],
        answer: 1,
        explanation: {
            en: "Never approve an unknown payment request.",
            hi: "अनजान पेमेंट रिक्वेस्ट को कभी स्वीकार न करें।"
        }
    },
    {
        question: {
            en: "A caller pretending to be customer care asks for your OTP.",
            hi: "एक व्यक्ति कस्टमर केयर बनकर आपको कॉल करता है और OTP मांगता है।"
        },
        options: [
            { en: "Tell them your OTP", hi: "उसे अपना OTP बता दें" },
            { en: "Share your UPI PIN", hi: "अपना UPI PIN बताएं" },
            { en: "Never share your OTP", hi: "अपना OTP कभी साझा न करें" }
        ],
        answer: 2,
        explanation: {
            en: "Genuine customer support never asks for your OTP or PIN.",
            hi: "असली कस्टमर सपोर्ट कभी आपका OTP या PIN नहीं मांगता।"
        }
    },
    {
        question: {
            en: "You find a shopping website offering extremely cheap products.",
            hi: "आपको एक शॉपिंग वेबसाइट मिलती है जहां सामान बहुत सस्ता मिल रहा है।"
        },
        options: [
            { en: "Check reviews and website details", hi: "रिव्यू और वेबसाइट की जानकारी जांचें" },
            { en: "Pay immediately", hi: "तुरंत पेमेंट करें" },
            { en: "Share card details", hi: "अपने कार्ड की जानकारी दें" }
        ],
        answer: 0,
        explanation: {
            en: "Always verify a website before making an online payment.",
            hi: "ऑनलाइन पेमेंट करने से पहले वेबसाइट की जांच जरूर करें।"
        }
    },
    {
        question: {
            en: "You receive a link to claim a lottery prize you never entered.",
            hi: "आपको ऐसी लॉटरी का इनाम पाने के लिए लिंक मिलता है जिसमें आपने हिस्सा ही नहीं लिया।"
        },
        options: [
            { en: "Open the link", hi: "लिंक खोलें" },
            { en: "Ignore the suspicious message", hi: "संदिग्ध मैसेज को नजरअंदाज करें" },
            { en: "Share bank details", hi: "बैंक की जानकारी दें" }
        ],
        answer: 1,
        explanation: {
            en: "Unexpected lottery messages are a common scam warning sign.",
            hi: "बिना हिस्सा लिए लॉटरी जीतने के मैसेज धोखाधड़ी का संकेत हो सकते हैं।"
        }
    },
    {
        question: {
            en: "You accidentally shared banking information on a suspicious website.",
            hi: "आपने गलती से एक संदिग्ध वेबसाइट पर बैंक की जानकारी साझा कर दी।"
        },
        options: [
            { en: "Ignore the incident", hi: "इस बात को नजरअंदाज करें" },
            { en: "Contact your bank immediately", hi: "तुरंत अपने बैंक से संपर्क करें" },
            { en: "Share more information", hi: "और जानकारी साझा करें" }
        ],
        answer: 1,
        explanation: {
            en: "Contact your bank immediately through official channels.",
            hi: "आधिकारिक माध्यम से तुरंत अपने बैंक से संपर्क करें।"
        }
    },
    {
        question: {
            en: "What is the safest way to protect your UPI account?",
            hi: "अपने UPI खाते को सुरक्षित रखने का सबसे अच्छा तरीका क्या है?"
        },
        options: [
            { en: "Share your PIN with friends", hi: "दोस्तों को अपना PIN बताएं" },
            { en: "Use the same PIN everywhere", hi: "हर जगह एक ही PIN इस्तेमाल करें" },
            { en: "Keep your PIN private and verify payments", hi: "अपना PIN गुप्त रखें और पेमेंट की जांच करें" }
        ],
        answer: 2,
        explanation: {
            en: "Keep your PIN private and carefully check every payment.",
            hi: "अपना PIN गुप्त रखें और हर पेमेंट की सावधानी से जांच करें।"
        }
    }
];

if (startGame && gameContent) {
    let currentQuestion = 0;
    let score = 0;

function showQuestion() {
    const q = scamQuestions[currentQuestion];

    const lang = currentLanguage;

    gameContent.innerHTML = `
        <p class="game-label">
            ${lang === "hi" ? "सवाल" : "QUESTION"}
            ${currentQuestion + 1} / ${scamQuestions.length}
        </p>

        <h3>${q.question[lang]}</h3>

        <div class="game-options">
            ${q.options.map((option, index) => `
                <button class="primary-btn game-option" data-index="${index}">
                    ${option[lang]}
                </button>
            `).join("")}
        </div>

        <div id="game-feedback"></div>
    `;

    gameContent.querySelectorAll(".game-option").forEach(button => {
        button.addEventListener("click", () => {
            const selected = Number(button.dataset.index);
            const correct = selected === q.answer;

            if (correct) score++;

            gameContent.querySelectorAll(".game-option").forEach(btn => {
                btn.disabled = true;
            });

            document.getElementById("game-feedback").innerHTML = `
                <p><strong>
                    ${correct
                        ? (lang === "hi" ? "सही जवाब!" : "Correct!")
                        : (lang === "hi" ? "गलत जवाब!" : "Not quite!")}
                </strong></p>

                <p>${q.explanation[lang]}</p>

                <button id="nextQuestion" class="primary-btn">
                    ${currentQuestion === scamQuestions.length - 1
                        ? (lang === "hi" ? "परिणाम देखें" : "See Result")
                        : (lang === "hi" ? "अगला सवाल" : "Next Question")}
                </button>
            `;

            document.getElementById("nextQuestion").addEventListener("click", () => {
                currentQuestion++;

                if (currentQuestion < scamQuestions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            });
        });
    });
}

function showResult() {
    const lang = currentLanguage;

    gameContent.innerHTML = `
        <p class="game-label">
            ${lang === "hi" ? "गेम पूरा हुआ" : "GAME COMPLETED"}
        </p>

        <h3>
            ${lang === "hi" ? "आपका स्कोर" : "Your Score"}:
            ${score} / ${scamQuestions.length}
        </h3>

        <p>
            ${score >= 8
                ? (lang === "hi" ? "बहुत अच्छा! डिजिटल सुरक्षा के प्रति जागरूक रहें।" : "Excellent awareness! Keep staying alert.")
                : (lang === "hi" ? "अच्छी कोशिश! डिजिटल सुरक्षा सीखते रहें।" : "Good effort! Keep learning digital safety.")}
        </p>

        <button id="restartGame" class="primary-btn">
            ${lang === "hi" ? "फिर से खेलें" : "Play Again →"}
        </button>
    `;

    document.getElementById("restartGame").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });
}

    
    startGame.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });
}