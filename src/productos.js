const productos = async () => {
return (await fetch("src/components/data/stock.json")).json()
}
