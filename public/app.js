document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    event.target.closest(".note-block").classList.add("d-none");
    event.target.closest("li").querySelector(".note-edit-block").classList.remove("d-none");
  }

  if (event.target.dataset.type === "edit-save") {
    const title = event.target.closest(".note-edit-block").querySelector("input").value.trim();
    if (title) {
      edit(event.target.dataset.id, title).then(() => {
        event.target.closest("li").querySelector("span").innerHTML = title;
        event.target.closest(".note-edit-block").classList.add("d-none");
        event.target.closest("li").querySelector(".note-block").classList.remove("d-none");
      });
    }
  }

  if (event.target.dataset.type === "edit-cencel") {
    event.target.closest(".note-edit-block").classList.add("d-none");
    event.target.closest("li").querySelector(".note-block").classList.remove("d-none");
    event.target.closest(".note-edit-block").querySelector("input").value = event.target
      .closest("li")
      .querySelector("span").innerText;
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ title }),
  });
}
