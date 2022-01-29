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

user_name = localStorage.getItem("username_key");
room_name = localStorage.getItem("roomname_key");

document.getElementById("room").innerHTML = "Room: " + room_name;

function send() {
      Message_sent = document.getElementById("Message").value;
      firebase.database().ref(room_name).push({
            username: user_name,
            msg: Message_sent,
            like: 0
      });
      document.getElementById("Message").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        sender=message_data['username'];
                        msg=message_data['msg'];
                        like=message_data['like'];
                        nametag="<h4>"+sender+"<img class='user_tick' src='tick.png'></h4>"
                        message_tag="<h4 class='message_h4'>"+msg+"</h4>"
                        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
                        row=nametag+message_tag+like_button+span_with_tag

                        document.getElementById("output").innerHTML+=row
                  }
            });
      });
}
getData();

function updateLike(message_id){
      likes=document.getElementById(message_id).value;
      new_likes=Number(likes)+1;

firebase.database().ref(room_name).child(message_id).update({
      like:new_likes
});
}

function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location = "index.html";
}