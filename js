// Page Navigation
function showPage(page) {
    document.querySelectorAll('.page-container').forEach(p => p.classList.remove('active'));
    if(page==='home') document.getElementById('home-page').classList.add('active');
    else if(page==='products') document.getElementById('products-page').classList.add('active');
    else if(page==='login') document.getElementById('login-page').classList.add('active');
}

// Sample Products
const products = [
     {name: "Gentle Face Wash", desc: "Sulfate-free cleanser for smooth skin", img: "https://via.placeholder.com/300x300", price: "₹299"},
     {name: "", desc: "Protects from harmful UV rays", img: "https://via.placeholder.com/300x300", price: "₹399"},
    {name: "Sun Protection SPF50", desc: "Protects from harmful UV rays", img: "https://via.placeholder.com/300x300", price: "₹399"},
    {name: "Sun Protection SPF50", desc: "Protects from harmful UV rays", img: "https://via.placeholder.com/300x300", price: "₹399"},   

   
    {name: "Hydrating Moisturizer", desc: "Keeps skin soft and radiant", img: "https://via.placeholder.com/300x300", price: "₹499"},
    {name: "Sun Protection SPF50", desc: "Protects from harmful UV rays", img: "https://via.placeholder.com/300x300", price: "₹399"},
   
];

const productGrid = document.getElementById("productGrid");
products.forEach(p => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-3xl shadow-md p-6 text-center transition hover:scale-105";
    card.innerHTML = `<img src="${p.img}" class="w-full h-64 object-cover rounded-2xl mb-4">
                      <h4 class="font-semibold text-xl mb-2">${p.name}</h4>
                      <p class="text-gray-600 mb-2">${p.desc}</p>
                      <p class="font-bold text-gray-800 mb-4">${p.price}</p>
                      <button class="btn primary w-full">Add to Cart</button>`;
    productGrid.appendChild(card);
});

// Quiz Questions
const quizQuestions = [
    {question: "How does your skin feel after washing?", options: ["Tight and dry", "Normal", "Oily", "Combination"]},
    {question: "Do you experience frequent breakouts?", options: ["Yes", "Sometimes", "Rarely", "Never"]},
    {question: "How sensitive is your skin?", options: ["Very sensitive", "Moderate", "Not sensitive", "Varies"]},
    {question: "How often does your skin get shiny or oily?", options: ["Always", "Sometimes", "Rarely", "Never"]},
    {question: "Do you have visible pores?", options: ["Large and noticeable", "Medium", "Small", "Varies by area"]},
    {question: "Do you experience redness or irritation easily?", options: ["Yes, very easily", "Sometimes", "Rarely", "Never"]},
    {question: "How often do you exfoliate?", options: ["Rarely", "Once a week", "2-3 times a week", "Daily"]},
];

// Quiz State
let currentQuiz = 0;
let quizAnswers = [];

// DOM Elements
const quizSection = document.getElementById("quizSection"),
      quizResult = document.getElementById("quizResult"),
      quizQuestion = document.getElementById("quizQuestion"),
      quizOptions = document.getElementById("quizOptions"),
      quizProgress = document.getElementById("quizProgress"),
      prevQuiz = document.getElementById("prevQuiz"),
      nextQuiz = document.getElementById("nextQuiz"),
      skinTypeEl = document.getElementById("skinType"),
      skinTipsEl = document.getElementById("skinTips");

// Start Quiz
function startQuiz() {
    quizSection.classList.remove('hidden');
    quizResult.classList.add('hidden');
    currentQuiz = 0;
    quizAnswers = [];
    loadQuiz();
}

// Load Quiz Question
function loadQuiz() {
    const q = quizQuestions[currentQuiz];
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = '';
    q.options.forEach((opt,i)=>{
        const btn = document.createElement('button');
        btn.className = 'options-btn';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i, btn);
        quizOptions.appendChild(btn);
    });
    prevQuiz.disabled = currentQuiz===0;
    nextQuiz.textContent = currentQuiz===quizQuestions.length-1 ? "Submit" : "Next";
    quizProgress.style.width = `${(currentQuiz/quizQuestions.length)*100}%`;
}

// Select Answer
function selectAnswer(index, btnClicked){
    quizAnswers[currentQuiz] = index;
    Array.from(quizOptions.children).forEach(btn => btn.style.backgroundColor='');
    btnClicked.style.backgroundColor = '#d46cb0';
}

// Navigation Buttons
prevQuiz.onclick = () => { if(currentQuiz>0){ currentQuiz--; loadQuiz(); } };
nextQuiz.onclick = () => {
    if(quizAnswers[currentQuiz]==null){ alert("Please select an option"); return; }
    if(currentQuiz < quizQuestions.length-1){ currentQuiz++; loadQuiz(); }
    else submitQuiz();
};

// Submit Quiz
function submitQuiz(){
    quizSection.classList.add('hidden');
    quizResult.classList.remove('hidden');
    const sum = quizAnswers.reduce((a,b)=>a+b,0);
    let type="", tips="";
    if(sum <= 4){ type="Dry Skin"; tips="Use hydrating moisturizers and gentle cleansers. Avoid hot water."; }
    else if(sum <= 10){ type="Normal Skin"; tips="Maintain a balanced routine with light moisturizers and sun protection."; }
    else if(sum <= 14){ type="Oily Skin"; tips="Use oil-free products, cleansers with salicylic acid, and blotting papers."; }
    else{ type="Combination Skin"; tips="Balance oily and dry areas using appropriate moisturizers for each zone."; }
    skinTypeEl.textContent = type;
    skinTipsEl.textContent = tips;
}

// Login Form
document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email && password){
        alert(`Logged in as ${email}`);
        showPage('home');
    } else {
        alert("Please fill all fields!");
    }
}); 
