const postBtn = document.querySelector("#submit-post-btn");

function addPost(event) {
  event.preventDefault();

  const postTitle = document.querySelector("#new-title").value.toString();
  const postBody = document.querySelector("#new-post-body").value.toString();

  if (postTitle && postBody) {
    if (postTitle.length > 255) {
      alert(
        `Post title cannot be more than 255 characters, over by ${
          postTitle.length - 255
        }`
      );
    } else if (postBody.length > 255) {
      alert(
        `Post body cannot be more than 255 characters, over by ${
          postBody.length - 255
        }`
      );
    } else {
      fetch("/api/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          content: postBody,
        }),
      })
        .then((response) => {
          if (response.ok) {
            window.location.replace("/dashboard");
          } else {
            console.log(response);
            alert("There has been an error");
            window.location.replace("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    alert("You must fill in both fields!");
  }
}

postBtn.addEventListener("click", addPost);
