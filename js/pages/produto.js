$(document).ready(function () {
  searchProduto();

  $(document).on("click", ".update-produto", function (event) {
    event.preventDefault();
    openModal($(this));
  });

  $(document).on("click", "#btnCadastrar", function (event) {
    event.preventDefault();
    openModal($(this));
  });

  $(document).on("click", "#btnSearch", function (event) {
    event.preventDefault();
    searchProduto();
  });
  $(document).on("click", "#btnSalvar", function (event) {
    let id = $("#modal-produto").find("#produto-id").val();
    let nome = $("#modal-produto").find("#produto-nome").val();
    let descricao = $("#modal-produto").find("#produto-descricao").val();
    let preco = $("#modal-produto").find("#produto-preco").val();

    let data = {
      nome: nome,
      descricao: descricao,
      preco: preco,
    };

    let method = null;

    if (id != "") {
      method = "PUT";
      data["id"] = id;
    } else {
      method = "POST";
    }

    $.ajax({
      contentType: 'application/json',
      url: `${baseUrl}/Produto`,
      method: method,
      data: data,
    }).done(function (response) {
      alert(response);
    });
  });

  $("#modal-produto").on("hidden.bs.modal", function () {
    $("#modal-produto").find("form").trigger("reset");
    $("#modal-produto").find("#produto-id").val("");
  });
});

async function searchProduto() {
  $table = $("#tabelaProdutos");

  loadingTable($table);

  let produtos = await listResources("Produto");

  let rows = [];
  produtos.forEach((produto) => {
    rows.push(`
      <tr>
        <td><center>${produto.id}</center></td>
        <td><center>${produto.nome}</center></td>
        <td><center>${produto.descricao}</center></td>
        <td><center>R$ ${produto.preco.toFixed(2)}</center></td>
        <td>
          <center>
            <a class="btn btn-warning update-produto" title="Alterar produto"
                produto-id="${produto.id}"
                produto-nome="${produto.nome}"
                produto-descricao="${produto.descricao}"
                produto-preco="${produto.preco}">
              <i class="fas fa-pencil-alt"></i>
            </a>
          </center>
        </td>
      </tr>
    `);
  });

  fillBodyTable($table, rows);
}

function openModal($btn) {
  let id = $btn.attr("produto-id");

  if (id != null) {
    $("#modal-produto").find("#produto-id").val(id);
    $("#modal-produto").find("#produto-nome").val($btn.attr("produto-nome"));
    $("#modal-produto")
      .find("#produto-descricao")
      .val($btn.attr("produto-descricao"));
    $("#modal-produto").find("#produto-preco").val($btn.attr("produto-preco"));

    $("#modal-produto").find(".modal-title").text("Alterar Produto");
  } else {
    $("#modal-produto").find(".modal-title").text("Cadastrar Produto");
  }

  $("#modal-produto").modal("show");
}
