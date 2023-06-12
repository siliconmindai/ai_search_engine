//Devuelve el string necesario para ingresar los datos a la db usando SQL Query
//IMPORTANTE: Formatear los strings y reemplazar los ' por ''(ojo, buscar otra alternativa ya que en la db aparece repetido)

const data = [{}]

const fields = Object.keys(data[0])

const rows_tuple_array = data.map((row) => {
  const row_tuple = `(${fields
    .map((field) => {
      const value = row[field]
      if (typeof value === "string") {
        return `'${value}'` // Agregar comillas a los valores de tipo string
      }
      return value
    })
    .join()})`
  return row_tuple
})

const rows_inline_string = rows_tuple_array.join()

console.log(rows_inline_string)
