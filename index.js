// Your web app's Firebase configuration
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

var details;

function getUserDetails (email) {

  var email = email.replace(/\./g,'');
  var db = firebase.database();
  var ref = db.ref();
  var data;
  return new Promise((resolve, reject) => {
    ref.child(email).on("value", function(snapshot) {
       resolve(snapshot.val());
    })
  })
}


async function init() {
  await getUserDetails(email).then(res => {
    details = res;
  });
  console.warn(details);
  const container = document.getElementById('card');
  const card = document.createElement('div');
  card.classList = 'card';
 const content = ` <span class="pro">PRO</span>
                    <img class="round" src="./assets/avatar.png" alt="user" style = "width: 200px;" />
                    <h1>${details.UserName}</h1>
                    <h3>${details.FullName}</h3>
                    <h4>${email}</h4>
                    <p>${details.report}</p>
                    <p>${details.Role}</p>
                    <div class="buttons">
                        <button class="primary ghost" onclick = "logout()">
                        <h3>logout</h3>
                        </button>
                      </div>
                        </div>

                    <footer>
                        <p>
                            Created with <i class="fa fa-heart"></i> by
                            <a target="" href="">Power BI</a>
                            - Read about
                            <a target="" href="">here</a>
                            - Power BI
                            <a target="" href="">Power BI</a>
                        </p>
                    </footer>`
    container.innerHTML += content;
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // window.alert("hi"+" "+user.uid);
        var userid=user.uid;
        var nam = user.displayName;

    } else {
        window.location.href = "login.html";
    }
});

function logout(){
    firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
  })
  .catch(function(error) {
    // An error happened
    window.alert("Error:"+error);
  });
}

init();
