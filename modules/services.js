export const getData = async () => {
  const res = await fetch('./cartas.json') // Promise
  const response = await res.json()
  const {data} = response
  return data
}