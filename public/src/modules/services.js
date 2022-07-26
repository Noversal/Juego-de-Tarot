
export const getData = async () => {
  const res = await fetch('./src/cartas.json') // Promise
  const {data} = await res.json()
  console.log({data})
  return data
}
