
export const getData = async () => {
  const res = await fetch('./src/cartas.json') // Promise
  const response = await res.json()
  const {data} = response
  return data
}
