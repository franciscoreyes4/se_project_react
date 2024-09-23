function ItemCard() {
    return (
        <div key={item.id}>
                <h2>{item.name}</h2>
                <img src={item.link} alt={item.name} />
              </div>
    )
}

export default ItemCard;