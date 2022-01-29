var firebaseConfig = {
      apiKey: "AIzaSyC7OJT4uZuF32MLRKUxhWe7S5gkwr0zCes",
      authDomain: "let-s-chat-8b0ac.firebaseapp.com",
      databaseURL: "https://let-s-chat-8b0ac-default-rtdb.firebaseio.com",
      projectId: "let-s-chat-8b0ac",
      storageBucket: "let-s-chat-8b0ac.appspot.com",
      messagingSenderId: "148930909198",
      appId: "1:148930909198:web:ec8b3fb729effa2f4c585f",
      measurementId: "G-W6TBH116PW"
    };
    
    // Initialize Firebase
   firebase.initializeApp(firebaseConfig);


// Initialize Firebase

username = localStorage.getItem("username_key");
document.getElementById("username").innerHTML = "welcome " + username + "!"

function addRoom() {
      var roomnm = document.getElementById("adrom").value;
      localStorage.setItem("roomname_key", roomnm);
      firebase.database().ref("/").child(roomnm).update({
            purpose: "adding_room"
      });
      window.location = "kwitter_page.html"

}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row = "<div id='" + Room_names + "' onclick='redirect(this.id)' class='room_name'>" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();

function redirect(currentRoom){
      console.log(currentRoom);
      localStorage.setItem("roomname_key",currentRoom);
      window.location="kwitter_page.html";
}
function logout(){
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location="index.html";
}