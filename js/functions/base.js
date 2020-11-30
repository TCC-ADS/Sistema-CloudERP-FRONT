const baseUrl = "https://1583d8aae0fb.ngrok.io/api";

async function listResources(endpoint) {
  data = [];

  await $.ajax({
    url: `${baseUrl}/${endpoint}`,
    method: "GET",
  }).done(function (response) {
    data = response;
  });

  return data;
}

function cleanTable($table, callback) {
  $table.find("tbody").empty();

  if (typeof callback === "function") {
    callback();
  }
}

function loadingTable($table, callback) {
  cleanTable($table);

  $table.find("tbody").html(`
    <tr>
      <td colspan="100%">
        <center>
        <i class="fas fa-cog fa-4x fa-spin"></i>
        </center>
      </td>
    </tr>
  `);

  if (typeof callback === "function") {
    callback();
  }
}

function fillBodyTable($table, rows, callback) {
  cleanTable($table);

  if (rows.length <= 0) {
    noneRegisters($table);
  } else {
    $table.find("tbody").html(rows.join(""));
  }

  if (typeof callback === "function") {
    callback();
  }
}

function noneRegisters($table) {
  $table.find("tbody").html(`
    <tr><td colspan="100%">Nenhum dado encontrado!</td></tr>
  `);
}
