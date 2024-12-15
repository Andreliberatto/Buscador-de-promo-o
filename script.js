function buscarProduto() {
    const produto = document.getElementById('produto').value;
    if (!produto) {
      alert("Por favor, insira o nome de um produto.");
      return;
    }
  
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`; // Exemplo usando Mercado Livre
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Limpar as listas de produtos
        document.getElementById('produtos-normal').innerHTML = '';
        document.getElementById('produtos-promocoes').innerHTML = '';
  
        // Mostrar os produtos com preço normal
        data.results.forEach(product => {
          const productItem = createProductItem(product, 'normal');
          document.getElementById('produtos-normal').appendChild(productItem);
  
          // Se o produto estiver em promoção, mostrar também
          if (product.price < product.original_price) {
            const promoProductItem = createProductItem(product, 'promocoes');
            document.getElementById('produtos-promocoes').appendChild(promoProductItem);
          }
        });
  
        // Mostrar a aba de Preço Normal por padrão
        openTab(event, 'normal');
      })
      .catch(error => {
        console.error("Erro ao buscar produto:", error);
        alert("Erro ao buscar o produto. Tente novamente mais tarde.");
      });
  }
  
  function createProductItem(product, type) {
    const productDiv = document.createElement('div');
    productDiv.className = 'produto-item';
  
    const productImage = document.createElement('img');
    productImage.src = product.thumbnail;
    productDiv.appendChild(productImage);
  
    const productTitle = document.createElement('div');
    productTitle.className = 'produto-titulo';
    productTitle.textContent = product.title;
    productDiv.appendChild(productTitle);
  
    const productPrice = document.createElement('div');
    productPrice.className = 'produto-preco';
    productPrice.textContent = `R$ ${product.price}`;
    productDiv.appendChild(productPrice);
  
    const productLink = document.createElement('a');
    productLink.className = 'produto-link';
    productLink.href = product.permalink;
    productLink.target = '_blank';
    productLink.textContent = 'Ir para o Produto';
    productDiv.appendChild(productLink);
  
    return productDiv;
  }
  
  function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontents.length; i++) {
      tabcontents[i].style.display = "none";
    }
  
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
  
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }
  