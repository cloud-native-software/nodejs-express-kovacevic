const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function App() {
  return (
    <>
      <Search />
      <Columns />
      <Table products={PRODUCTS} />
    </>

  )
}

function Search() {
  return (
    <>
      <input type="text" placeholder="Search" /> <br />
      <input type="checkbox" />
      <p style={{ margin: 0 }}>Only show product in stock</p>
    </>
  )
}

function Columns() {
  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "row" }}>
      <h3>Name</h3>
      <h3>Price</h3>
    </div>
  )
}
function Table({ products }) {

  return (
    <>
      <tr>
        <th>
          Fruits
        </th>
      </tr>
      {products.map(x => {
        if (x.category == "Fruits") {
          return (
            <tr>
              <td style={!x.stocked ? ({ color: "red" }) : null}>
                {x.name}
              </td>
              <td>
                {x.price}
              </td>
            </tr>
          )
        }
      })}
      <tr>
        <th>
          Vegetables
        </th>
      </tr>
      {products.map(x => {
        if (x.category == "Vegetables") {
          return (
            <tr>
              <td style={!x.stocked ? ({ color: "red" }) : null}>
                {x.name}
              </td>
              <td>
                {x.price}
              </td>
            </tr>
          )
        }
      })}

    </>
  )


}

export default App

