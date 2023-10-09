$("form").submit(function (e) {
    e.preventDefault()
    let nomePrograma = $("input").val()
    $("form").trigger("reset")
    $(".container").empty()
    $.ajax({
        url: `https://api.tvmaze.com/search/shows?q=${nomePrograma}`,
        type: "GET",
        success: function (msg) {
            let h3 = $("<h3>")
            $(".container").append(h3)
            if (msg.length != 0) {
                h3.text("Resultados obtidos")
                for (let i = 0; i < msg.length; i++) {
                    let idPrograma = msg[i].show.id
                    let divCard = $("<div>")
                    let divCardBody = $("<div>")
                    let img = $("<img>")
                    let h5name = $("<h5>")
                    let iSummary = $("<i>")//apenas para deixar a descrição em italico
                    let buttonEp = $("<button>")

                    divCard.addClass("card shadow p-3 mb-5 bg-body rounded")
                    divCardBody.addClass("card-body")

                    img.addClass("card-img-top")
                    h5name.addClass("card-title")
                    iSummary.addClass("card-text")

                    buttonEp.addClass("btn btn-primary")
                    buttonEp.text("Mostrar episódios")

                    if (msg[i].show.image == null) {
                        img.prop("src", "fundo.png")
                        img.prop("width", "220")
                        img.prop("height", "300")
                    } else {
                        img.prop("src", msg[i].show.image.medium)
                    }

                    h5name.text(msg[i].show.name)
                    iSummary.append(msg[i].show.summary)//já que msg[i].show.summary é uma tag <p>!

                    divCardBody.append(h5name)
                    divCardBody.append(iSummary)
                    divCardBody.append(buttonEp)

                    divCard.append(img)
                    divCard.append(divCardBody)

                    $(".container").append(divCard)

                    buttonEp.on("click", function () {
                        $.ajax({
                            url: `https://api.tvmaze.com/shows/${idPrograma}/episodes`,
                            type: "GET",
                            success: function (msg) {
                                let modal = $(".modal")
                                let titleModal = $(".modal-title")
                                let bodyModal = $(".modal-body")

                                titleModal.text(h5name.text())

                                $(".btn-close").click(function () {
                                    modal.hide()
                                })

                                let table = $("<table>")
                                table.addClass("table table-hover")

                                let thead = $("<thead>")
                                let tbody = $("<tbody>")
                                let trThead = $("<tr>")
                                let thNome = $("<th>")
                                let thTemporada = $("<th>")
                                let thEp = $("<th>")
                                let thData = $("<th>")

                                thNome.text("Nome")
                                thTemporada.text("Temporada")
                                thEp.text("Episódio")
                                thData.text("Data")

                                trThead.append(thNome)
                                trThead.append(thTemporada)
                                trThead.append(thEp)
                                trThead.append(thData)

                                thead.append(trThead)
                                table.append(thead)

                                for (let i = 0; i < msg.length; i++) {
                                    let trTbody = $("<tr>")
                                    let tdNome = $("<td>")
                                    let tdTemporada = $("<td>")
                                    let tdEp = $("<td>")
                                    let tdData = $("<td>")

                                    tdNome.text(msg[i].name)
                                    tdTemporada.text(msg[i].season)
                                    tdEp.text(msg[i].number)
                                    tdData.text(msg[i].airdate)

                                    trTbody.append(tdNome)
                                    trTbody.append(tdTemporada)
                                    trTbody.append(tdEp)
                                    trTbody.append(tdData)

                                    tbody.append(trTbody)
                                }

                                table.append(tbody)
                                bodyModal.html(table)
                                modal.show()
                            }
                        })
                    })
                }

            }else{
                h3.text("Não há séries para mostrar")
            }
        }
    })
})
