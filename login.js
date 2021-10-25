var loginpage = document.getElementById("login-page");
var signuppage = document.getElementById("signup-page");
var loginform = document.getElementById("login-form");
var signupform = document.getElementById("signup-form");
signupform.style.display = "none";

function signupForm(){
    loginform.style.display="none";
    signupform.style.display = "block";
}
function loginForm(){
    signupform.style.display = "none";
    loginform.style.display="block";
    
}
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.email);
        var email = user.email;
        email = email.replace(/\./g,'');

        var fullName = email.substring(0, email.lastIndexOf("@"));
        init(user.email, fullName, fullName);
        // User is signed in.
        document.getElementById("loginform").style.display="none";
        change();
        window.location.href="index.html?email=" + user.email;
      } else {
        // No user is signed in.
        document.getElementById("loginform").style.display="block";

      }
    });

loginform.addEventListener('submit',(e) =>{
  e.preventDefault();
  var butId = e.submitter.id;
  if(butId == 'loginbtn'){
    var userEmail = document.getElementById("eimp").value;
    var userPass = document.getElementById("pimp").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
     .then((userCredential)  => {
      // Signed in 
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);
     
    });
  }else {
    soicalSignup();
  }
  
});

function logout(){
  firebase.auth().signOut();
}

signupform.addEventListener('submit',(e) =>{
  e.preventDefault();
  var email= document.getElementById("email").value;
  var pass =document.getElementById("password").value;
  var name = document.getElementById("name").value;
  var userName = document.getElementById("usrname").value;
  var user = firebase.auth().currentUser;
   
  saveDetail(email, name, userName);//save user detais.

  firebase.auth().createUserWithEmailAndPassword(email,pass).then(cred => {

  });

  firebase.auth().signInWithEmailAndPassword(email, pass).then((userCredential)  => {

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log("Error : " + errorMessage);

  });
  
});

function change(){
  var user = firebase.auth().currentUser;
  var name = document.getElementById("name").value;

  user.updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
      // An error happened.
    });
};

async function init(email, fullName, userName) {
  console.log(email, fullName, userName)
    await saveDetail(email, fullName, userName);
}


function saveDetail (email, fullName, userName){
  
  var email = email.replace(/\./g,'');
  var dbref = firebase.database().ref(email);
  new Promise((resolve, reject) => {
    dbref.child("FullName").set(fullName);
    dbref.child("UserName").set(userName);
    dbref.child("Role").set("audience");
    dbref.child("report").child("1").set("reportI");
    dbref.child("report").child("2").set("reportII");
    dbref.child("report").child("3").set("reportIII");
  })
}

function soicalSignup() {
  var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider).then(result => {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token);
      console.log(user);



    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code)
      console.log(error.message)
    });
}

