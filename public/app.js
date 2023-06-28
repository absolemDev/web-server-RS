document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = prompt("Введите новое значение", event.target.dataset.title).trim();
    if (title) {
      edit(id, title);
    }
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
