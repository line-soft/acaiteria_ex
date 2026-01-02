let total = 0;
const totalEl = document.getElementById("total");
const resumoEl = document.getElementById("resumo-pedido");

document.querySelectorAll(".item").forEach(item => {
  const inc = item.querySelector(".inc");
  const dec = item.querySelector(".dec");
  const countEl = item.querySelector(".count");
  const add = item.querySelector(".add");

  const sabores = item.querySelectorAll("input[type=radio][name^='sabor']");
  const complementosBox = item.querySelector(".complementos");
  const complementos = complementosBox.querySelectorAll("input[type=checkbox]");
  const caldasBox = item.querySelector(".caldas");
  const caldas = caldasBox.querySelectorAll("input[type=radio]");

  inc.onclick = () => countEl.textContent++;
  dec.onclick = () => {
    if (countEl.textContent > 1) countEl.textContent--;
  };

  sabores.forEach(r => {
    r.addEventListener("change", () => {
      complementosBox.style.display = "block";
    });
  });

  complementos.forEach(c => {
    c.addEventListener("change", () => {
      caldasBox.style.display = [...complementos].some(x => x.checked)
        ? "block"
        : "none";
    });
  });

  add.onclick = () => {
    const sabor = [...sabores].find(r => r.checked);
    const calda = [...caldas].find(r => r.checked);
    const comps = [...complementos].filter(c => c.checked).map(c => c.value);

    if (!sabor) return alert("Escolha o sabor do açaí");
    if (!calda) return alert("Escolha a calda");

    const qty = parseInt(countEl.textContent);
    const price = parseFloat(item.dataset.price);

    total += price * qty;
    totalEl.textContent = total.toFixed(2);

const subtotal = price * qty;

const resumoItem = document.createElement("div");
resumoItem.className = "resumo-item";
resumoItem.dataset.subtotal = subtotal;

resumoItem.innerHTML = `
  <div class="resumo-texto">
    <strong>${item.dataset.name}</strong> (${qty}x)<br>
    Sabor: ${sabor.value}<br>
    Complementos: ${comps.length ? comps.join(", ") : "Nenhum"}<br>
    Calda: ${calda.value}
  </div>

  <button class="remove-item">🗑️</button>
`;

resumoEl.appendChild(resumoItem);

/* remover item */
resumoItem.querySelector(".remove-item").onclick = () => {
  total -= subtotal;
  totalEl.textContent = total.toFixed(2);
  resumoItem.remove();
};


    // ===== LIMPAR SELEÇÕES APÓS ADICIONAR =====

// volta quantidade para 1
countEl.textContent = 1;

// desmarca sabores
sabores.forEach(r => r.checked = false);

// desmarca complementos
complementos.forEach(c => c.checked = false);

// desmarca caldas
caldas.forEach(c => c.checked = false);

// esconde novamente as opções
complementosBox.style.display = "none";
caldasBox.style.display = "none";
  };
});

document.getElementById("send").onclick = () => {
  if (total === 0) return alert("Adicione itens");

  let mensagem = "🍨 *Pedido de Açaí* 🍨\n\n";
  mensagem += resumoEl.innerText;
  mensagem += `\n\n💰 Total: R$ ${total.toFixed(2)}`;

  const texto = encodeURIComponent(mensagem);

  window.open(`https://wa.me/5521965781487?text=${texto}`);
};