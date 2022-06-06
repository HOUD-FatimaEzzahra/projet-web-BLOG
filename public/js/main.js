const BASE_URL = "http://localhost:4000/";
const articleHTML = (article) => /*html*/ `
<div id=${
  "article" + article?.id
} class="col-lg-4 col-md-6 col-12 mb-5 mb-lg-0">
<div class="pricing-thumb bg-white shadow-lg">                                
    <div class="pricing-title-wrap d-flex align-items-center">
        <h6 class="pricing-title text-white mb-0">${article?.titre}</h4>
    </div>
    <div class="pricing-body">
        <img src="images/dell-xps-15-9500.jpg" class="card-img-top" alt="Fissure in Sandstone"/>
        <div class="border-bottom pb-3 mb-4"></div>
        <p>${article?.contenu?.slice(0, 100) + "..."}</p>
        <a class="custom-btn btn mt-3" href="#section_6">Lire la suite</a>
    </div>
</div>
</div>`;

const fetchServer = async (route) => {
  const response = await fetch(BASE_URL + route);
  const result = await response.json();
  return result;
};

const postServer = async (route, body) => {
  const response = await fetch(BASE_URL + route, {
    method: "POST",
    body: body,
  });
  const result = await response.json();
  return result;
};

const loadArticles = async () => {
  const articles = await fetchServer("articles?take=10&skip=0");
  articles?.articles?.map((article) => {
    $("#lastestArticles").append($(articleHTML(article)));
  });
};

const connect = async (email, password) => {
  const credentals = {
    email: email,
    password: password,
  };
  const user = await postServer("users/login/", JSON.stringify(credentals));
  return user;
};

const disconnect = () => {
  localStorage.removeItem("user");
  $("#navConnectHeader").show();
  $("#section_7").show();
  $("#section_8").show();
  $("#connectHeader").show();

  $("#disconnectHeader").hide();
  $("#navDeconnectHeader").hide();
  $("#section_9").hide();
};

const handleConnect = async () => {
  const email = $("#emailConnect").val();
  const password = $("#passwordConnect").val();
  const user = await connect(email, password);
  if (!user?.user) {
    alert("password or mdp incorrect");
    return;
  }
  localStorage.setItem("user", JSON.stringify(user.user));
  $("#disconnectHeader").show();
  $("#navDeconnectHeader").show();
  $("#section_9").show();

  $("#navConnectHeader").hide();
  $("#section_7").hide();
  $("#section_8").hide();
  $("#connectHeader").hide();
};

const handleRegister = async () => {
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmpassword = $("#confirmpassword").val();
  const name = $("#name").val();
  const firstname = $("#firstname").val();

  const creds = {
    email: email,
    password: password,
    nom: name,
  };

  const user = await postServer("users", JSON.stringify(creds));
  if (!user?.user) {
    alert("email or name already exists , please try again");
    return;
  }
  alert("registed !");
};

const checkLocalStorage = async () => {
  const user = await JSON.parse(localStorage.getItem("user"));
  if (!user) {
    $("#disconnectHeader").hide();
    $("#navDeconnectHeader").hide();
    $("#section_9").hide();
  } else {
    $("#navConnectHeader").hide();
    $("#section_7").hide();
    $("#section_8").hide();
    $("#connectHeader").hide();
  }
};

window.addEventListener("DOMContentLoaded", async (event) => {
  await checkLocalStorage();
  await loadArticles();
  console.log("DOM fully loaded and parsed");
});

$(document).on("click", "#deconnect", () => disconnect());
$(document).on("click", "#btnConnect", async (e) => {
  e.preventDefault();
  await handleConnect();
});

$(document).on("click", "#register", async (e) => {
  e.preventDefault();
  await handleRegister();
});
