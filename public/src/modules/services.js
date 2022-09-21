
export const getData = async () => {
  const res = await fetch('https://first-api-tarot-cards.onrender.com/cartas') // Promise
  const data = await res.json()
  console.log({ data })
  return data[0].data
}
