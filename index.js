let userName = document.getElementById('name');
let userEmail = document.getElementById('email');

let buttonValider = document.querySelector('.bouton');
let form = document.getElementById('inscription');
let homePage = document.querySelector('.formulaire');

let secondForm = document.querySelector('.question');
let id = 0;
let thirdForm = document.querySelector('.resultat');
let btnSuivant = document.querySelector('#boutonsuivant');
let btnAccuel = document.querySelector('.boutonAccuel');
let max = 15;
// let score;
let lastResult = document.querySelector('.score');
let iconeResult = document.querySelector('i');
let affichNom = document.querySelector('.nom');
let affichEmail = document.querySelector('.Email')
let radios = document.querySelectorAll('.reponse-question');
let btnquitter = document.querySelector('#boutonquitter');


let answers = {};



// VALIDATION 
let nameErrorMessage = document.createElement("span");
let mailErrorMessage = document.createElement("span");
nameErrorMessage.textContent = "";
mailErrorMessage.textContent = "";
userName.after(nameErrorMessage);
userEmail.after(mailErrorMessage);

homePage.addEventListener("submit", storeUserData = (event) => {
    event.preventDefault();
    nameErrorMessage.classList.add("errorMessage");
    mailErrorMessage.classList.add("errorMessage");

    const validUserName = new RegExp(/(?=.*[a-zA-Z.]{2,})/);
    const validUserMail = new RegExp(/(?=.*@)/)

    const correctUserName = userName.value.match(validUserName);
    const correctUserMail = userEmail.value.match(validUserMail);

    if (correctUserName == null) {
        userName.style.border = ".1em solid red";
        nameErrorMessage.textContent = "N’oubliez pas de renseigner votre nom avant de commencer le Quiz.";
    } else {
        localStorage.setItem("user-name", userName.value);
        nameErrorMessage.textContent = "";
        userName.style.border = ".1em solid #028A3D";
    }
    if (correctUserMail == null) {
        userEmail.style.border = ".1em solid red";
        mailErrorMessage.textContent = "N’oubliez pas de renseigner votre email avant de commencer le Quiz."
    } else {
        localStorage.setItem("user-mail", userEmail.value);
        mailErrorMessage.textContent = "";
        userEmail.style.border = ".1em solid #028A3D";
    };
    if (correctUserName != null && correctUserMail != null) {
        homePage.style.display = "none";
        //     quizPage.classList.add("show");


        // form.reset();
        secondForm.style.display = "block";
        questionnaire(id);
        move();
        //     showQuestionsFunction(0);
    };
});

// FIN VALIDATION

let questions = [{
        id: 0,
        numero: "1/15",
        question: "Quel est le type d'un fichier javascript?",
        bonneReponse: ".js",
        reponses: [
            ".ts",
            ".jsx",
            ".js",
            ".j"
        ]
    },
    {
        id: 1,
        numero: "2/15",
        question: "Comment écrire une instruction IF en JavaScript ?",
        bonneReponse: "if (i == 5)",
        reponses: [

            "if i = 5 then",
            "if i == 5 then",
            "if (i == 5)",
            " if i = 5"
        ]
    },
    {
        id: 2,
        numero: "3/15",
        question: "Comment écrire une instruction IF pour exécuter du code si &quot;i&quot; n'est PAS égal à 5?",
        bonneReponse: "if (i != 5)",
        reponses: [

            "if (i <> 5)",
            "if i <> 5",
            "if (i != 5)",
            "if i =! 5 then"
        ]
    },
    {
        id: 3,
        numero: "4/15",
        question: "Comment pouvez-vous détecter le nom du navigateur du client ? ",
        bonneReponse: "navigator.appName",
        reponses: [
            "navigator.appName",
            "nom.navigateur",
            "client.navName",
            "navigateur.client"

        ]
    },
    {
        id: 4,
        numero: "5/15",
        question: "Vous travaillez sur un projet JavaScript. Comment puis-je demander des entrées à l’utilisateur ?",
        bonneReponse: "Une alerte",
        reponses: [
            "Une alerte()",
            "Affichage()",
            "Invite C()",
            " Confirmer()"

        ]
    },
    {
        id: 5,
        numero: "6/15",
        question: "Comment déclarez-vous une variable JavaScript?",
        bonneReponse: "var carName",
        reponses: [
            "var carName",
            "variable carName",
            "v carName",
            "carNam var"
        ]
    },

    {
        id: 6,
        numero: "7/15",
        question: "Quelle est la syntaxe correcte pour faire référence à un script externe appelé 'xxx.js' ?",
        bonneReponse: "&lt;script src=&quot;xxx.js&quot;&gt",
        reponses: [
            "&ltscript href=&quot;xxx.js&quot;>",
            "&lt;script name=&quot;xxx.js&quot;&gt;",
            "&lt;script src=&quot;xxx.js&quot;&gt;",
            "&lt;script var=&quot;xxx.js&quot;&gt;"


        ]
    },
    {
        id: 7,
        numero: "8/15",
        question: "Comment pouvez-vous ajouter un commentaire dans un JavaScript ?",
        bonneReponse: "//Ceci est un commentaire",
        reponses: [
            "//Ceci est un commentaire",
            "&sbquo;Ceci est un commentaire",
            "&lt;!--Ceci est un commentaire--&gt;",
            "/*Ceci est un commentaire"


        ]
    },
    {
        id: 8,
        numero: "9/15",
        question: "Quel opérateur est utilisé pour affecter une valeur à une variable ?",
        bonneReponse: "=",
        reponses: [
            "*",
            "-",
            "=",
            "x"

        ]
    },
    {
        id: 9,
        numero: "10/15",
        question: "JavaScript est-il sensible à la casse ?",
        bonneReponse: "Yes",
        reponses: [
            "No",
            "Yes",
            "dans certains cas ",
            "probable"


        ]
    },
    {
        id: 10,
        numero: "11/15",
        question: "Comment appelle-t-on une fonction nommée &quot;myFunction&quot; ?",
        bonneReponse: "myFunction()",
        reponses: [
            "call function myFunction()",
            "call myFunction()",
            "myFunction()",
            "varFunction()"

        ]
    },
    {
        id: 11,
        numero: "12/15",
        question: "Comment démarre une boucle WHILE?",
        bonneReponse: "while (i &lt;= 10)",
        reponses: [
            "while i = 1 to 10",
            "while (i &lt;= 10; i++)",
            "while (i &lt;= 10)",
            "while (i &lt;> 10)"


        ]
    },
    {
        id: 12,
        numero: "13/15",
        question: "How does a FOR loop start?",
        bonneReponse: "for (i = 0; i &lt;= 5; i++)",
        reponses: [
            "for (i = 0; i &lt;= 5)",
            "for (i = 0; i &lt;= 5; i++)",
            "for i = 1 to 5",
            "for (i &lt;= 5; i++)"


        ]
    },
    {
        id: 13,
        numero: "14/15",
        question: "Comment arrondissez-vous le nombre 7,25 à l'entier le plus proche ?",
        bonneReponse: "Math.round(7.25)",
        reponses: [
            "rnd(7.25)",
            "Math.round(7.25)",
            "Math.rnd(7.25)",
            "round(7.25)"

        ]
    },
    {
        id: 14,
        numero: "15/15",
        question: "Quel événement se produit lorsque l'utilisateur clique sur un élément HTML ?",
        bonneReponse: "onclick",
        reponses: [
            "onchange",
            "onclick",
            "onmouseclick",
            "onmouseover"


        ]
    }
]

//Selection des éléments pour chaque question
let q = document.querySelector('.quest');
let numeroQuestion = document.querySelector('.note');
let label1 = document.querySelector('#label1');
let label2 = document.querySelector('#label2');
let label3 = document.querySelector('#label3');
let label4 = document.querySelector('#label4');

//création de la fonction questionnaire
function questionnaire(id) {
    q.textContent = questions[id].question;
    numeroQuestion.textContent = "Question " + questions[id].numero;
    console.log("numero" + numeroQuestion);
    label1.textContent = questions[id].reponses[0];
    label2.textContent = questions[id].reponses[1];
    label3.textContent = questions[id].reponses[2];
    label4.textContent = questions[id].reponses[3];
    move()
}

function reinitialisation() {
    radios[0].checked = false;
    radios[1].checked = false;
    radios[2].checked = false;
    radios[3].checked = false;
}
// progresse barre


let time = 0;
let temps = 60;
let intervalId;
let compteur = document.querySelector('.temps')


function move() {
    clearInterval(intervalId);
    // if (time < 60) {
    // time = 60;
    let element = document.getElementById("progressbar");



    intervalId = setInterval(function() {
        if (temps === 0) {
            clearInterval(intervalId);
            btnSuivant.disabled = false;
            btnSuivant.click();
        } else {
            temps--
            element.value = temps;
            compteur.textContent = temps;

        }

    }, 1000);




    // } else {
    //     console.log("mira")
    // }
}

let enters = document.querySelectorAll(".input");

btnSuivant.disabled = true;


for (let enter of enters) {
    enter.addEventListener("change", function(event) {
        stateHandle(event);
        const reponseUtilisateur = event.target.nextElementSibling.textContent;
        const question = questions[id];

        const estCeLaBonneReponse = reponseUtilisateur === question.bonneReponse;
        answers[id] = estCeLaBonneReponse;
    });
}

function stateHandle(event) {
    if (event.target.value === null) {
        btnSuivant.disabled = true;
    } else {
        btnSuivant.disabled = false;
        btnSuivant.style.background = 'green';


    }
}

// btnSuivant
let mira = document.querySelector(".mira");

btnSuivant.addEventListener('click', (e) => {
    e.preventDefault();
    btnSuivant.disabled = true;
    btnSuivant.style.background = "rgba(2, 138, 61, 0.42)"
    mira.reset();
    // time = 0;
    // move()

    questionnaire(id);

    if (id < 14) {
        // Savoir si l'utilisateur a bien répondu


        reinitialisation()

        if (id == 13) {
            btnSuivant.textContent = "Terminer";
        }
        id += 1;
        temps = 60;
        questionnaire(id);

    } else {
        resultat();
    }


});
// bouton quitter 
btnquitter.addEventListener('click', (e) => {
    e.preventDefault();
    resultat();
})

function suivant() {
    _
}



// Resultat
function resultat() {
    // console.log(affichNom.value);
    // affichNom = nom.value;
    // affichEmail = email.value;
    affichNom.textContent = userName.value;
    affichEmail.textContent = userEmail.value;

    const answersList = Object.values(answers);

    let compte = 0;

    for (let answer of answersList) {
        if (answer) {
            compte++;
        }
    }

    secondForm.style.display = "none";
    thirdForm.style.display = "flex";
    lastResult.textContent = compte + "/" + max;
    if (compte > 2) {
        iconeResult.classList.add(
            "fa-regular",
            "fa-circle-check",
            "success-color"
        );

    } else {
        iconeResult.classList.add(
            "fa-regular",
            "fa-circle-xmark",
            "failure-color"
        );
    }
}

btnAccuel.addEventListener('click', (e) => {
        homePage.style.display = "none";
        secondForm.style.display = "none";
        thirdForm.style.display = "block";
        location.reload();

    })
    // score